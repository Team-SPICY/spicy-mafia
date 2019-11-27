import React, { Component } from 'react';
import './Game.css';
import axios from 'axios'
import PlayerList from "./PlayerList";
import Lobby from '../Lobby/Lobby'
import UserNightComponent from '../UserComponents';
import UserDayComponent from '../UserComponents/UserDayComponent';
import '../UserComponents/Cycles.css'

import { Modal, Button, ListGroup } from 'react-bootstrap'

import FlipCard from 'react-flipcard';

import Image from "react-bootstrap/Image";
import WebSocketInstance from '../../services/WebSocket'
import Instructions from './Instructions'

export default class Game extends Component {
    constructor(props) {
        super(props);
        //bind handle vot function
        this.handleVoteRecieved = this.handleVoteRecieved.bind(this);
        this.handleVote = this.handleVote.bind(this);

        this.state = {
            users: [],
            //update alive users after a gameState change(someone is killed/executed)
            aliveUsers: {},
            nurseVotes: [],
            sheriffVotes: [],
            mafiaVotes: [],
            playersShow: false,
            gameState: 'Lobby',
            //isHost: false,
            role: 'civilian',
            isHost: false,
            flipped: false,
            prevVote: "",
            accused: '',
            trialVotes: {},
            mafia_kill: false,
            nurse_saved: false,
            successful_investigation: false,
            is_alive: true
        };

        this.waitForSocketConnection(() => {
            //hit lobby api to get users in lobby and set state
            axios.get('http://127.0.0.1:8000/api/lobby/')
                .then(res => {
                    const rooms = res['data'];
                    console.log('rooms: ', rooms);
                    const db_users = Object.keys(rooms[this.props.roomID]['players']);
                    console.log('users from api: ', db_users);
                    this.setState({ users: [...this.state.users, ...db_users] });
                    console.log(`users: ${this.state.users}`);
                })
            WebSocketInstance.joining(this.props.currentUser);
            WebSocketInstance.addCallbacks(this.handleVoteRecieved.bind(this),
                this.handleCycleChange.bind(this),
                this.addUser.bind(this),
                this.disconnect.bind(this),
                this.setRole.bind(this),
                this.updatePlayers.bind(this),
                this.handleAccused.bind(this),
                this.handleTrialVote.bind(this),
                this.handleTrialKill.bind(this),
                );
        });
    }

    waitForSocketConnection(callback) {
        const component = this;
        setTimeout(
            function () {
                // Check if websocket state is OPEN
                if (WebSocketInstance.state() === 1) {
                    console.log("Connection is made")
                    callback();
                    return;
                } else {
                    console.log("wait for connection...")
                    component.waitForSocketConnection(callback);
                }
            }, 100); // wait 100 milisecond for the connection...
    }

    handleTrialKill(alive_users) {
        console.log("updating results from previous cycle");
        console.log("new_alive_players ", alive_users);
        this.setState({ aliveUsers: alive_users });
        if (!(this.props.currentUser in alive_users)) {
            this.setState({is_alive: false})
        }
    }

    // set state to new accused
    handleAccused(accused_name) {

        this.setState({accused: accused_name});
        this.setState({trialVotes: {}});
        console.log(`Accused player: ${accused_name}`);
    }

    handleTrialVote(playername, vote) {
        const votesCopy = this.state.trialVotes;
        votesCopy[playername] = vote;
        this.setState({trialVotes: votesCopy});
    }

    //call back when websocket recieves role
    setRole(role, roles) {

        this.setState({ role: role, aliveUsers: roles });
        console.log("role for user: ", role, roles)
        //set civilian users

    }

    startGame() {
        var lobby = "http://127.0.0.1:8000/api/lobby/" + this.props.roomID + "/"
        axios.put(lobby, { 'start_game': true })
            .then(res2 => {
                console.log('response from starting game', res2)
                if (res2['data']["game_activated"] === true) {
                    //send a message to the server websocket to change cycles
                    WebSocketInstance.sendMessage({ 'command': 'set_roles', 'host_name': this.props.currentUser });
                    WebSocketInstance.sendMessage({ 'command': 'change_cycle', 'cycle': this.state.gameState });
                }
            })
    }

    resolve_votes() {
        if (this.state.gameState === "Nightime") {
            WebSocketInstance.sendMessage({ 'command': 'resolve_votes',
                                            'cycle': this.state.gameState,
                                            'role': this.state.role,
                                            'alive_users': this.state.aliveUsers,
                                            'mafia_votes': this.state.mafiaVotes,
                                            'sheriff_votes': this.state.sheriffVotes,
                                            'nurse_votes': this.state.nurseVotes})
        }
        WebSocketInstance.sendMessage({ 'command': 'change_cycle', 'cycle': this.state.gameState })
    }

    updatePlayers(mafia_kill, nurse_saved, successful_investigation, alive_users) {
        console.log("updating results from previous cycle");
        console.log("new_alive_players ", alive_users);
        this.setState({ mafia_kill: mafia_kill, nurse_saved: nurse_saved, successful_investigation: successful_investigation ,aliveUsers: alive_users });
        if (!(this.props.currentUser in alive_users)) {
            this.setState({is_alive: false})
        }
    }

    //handle votes from sherrif or nurse
    handleSpecialAbility() {
        console.log('handling special ability');

        //send to api vote

    }

    handleQuizVote() {
        console.log('handling quiz vote');
    }

    //handle a vote recieved from websocket should only be for mafia at night or execution for daytime
    handleVoteRecieved(parsedData) {
        const voter = parsedData.voter;
        const voted = parsedData.voted;

        //user that was previously voted for
        const prev_voted = parsedData.prev_voted;

        //list of user that have been voted for, this will be set based on the role of the voter
        var voted_for;

        console.log('vote recieved for: ', voted);
        //If the vote is during night then it must be coming from the Mafia, Sheriff or Nurse
        if (this.state.gameState === 'Nightime') {
            const role = this.state.aliveUsers[voter];
            if (role === 'mafia') {
                //set what list we are looking at based on role of voter
                voted_for = this.state.mafiaVotes;
                //remove previous vote from votedFor list
                if (prev_voted !== "") {
                    console.log('prev voted: ', prev_voted);
                    var index = voted_for.indexOf(prev_voted);
                    voted_for.splice(index, 1);
                }
                //insert new vote into list
                voted_for = [...voted_for, voted];
                this.setState({ mafiaVotes: voted_for });
                console.log('new state for votes: ', this.state.votedFor)
            } else if (role === 'sheriff') {
                voted_for = this.state.sheriffVotes;
                if (prev_voted !== "") {
                    var index = voted_for.indexOf(prev_voted);
                    voted_for.splice(index, 1);
                }
                voted_for = [...voted_for, voted];
                this.setState({ sheriffVotes: voted_for });

            } else if (role === 'nurse') {
                voted_for = this.state.nurseVotes;
                if (prev_voted !== "") {
                    var index = voted_for.indexOf(prev_voted);
                    voted_for.splice(index, 1);
                }
                voted_for = [...voted_for, voted];
                this.setState({ nurseVotes: voted_for });
            }
        }

        //else the vote is during the day so we are executing somebody

    }

    //handle a vote submitted
    handleVote(voter, voted) {
        var prev_vote;
        console.log('prev vote: ', this.state.prevVote);
        if (this.state.prevVote === "") {
            prev_vote = "";
        }
        else {
            prev_vote = this.state.prevVote;
        }
        const data = {
            'command': 'new_vote',
            'voter': voter,
            'voted': voted,
            'prev_vote': prev_vote,
        };
        this.setState({ prevVote: voted });
        //send vote to websocket
        WebSocketInstance.sendMessage(data);
        console.log('vote submmitted');
    }


    //handle day night cycle change, param state should be the new state to enter
    handleCycleChange(cycle) {
        console.log('cycle change initiated');
        if (cycle === "Daytime") {
            this.setState({nurseVotes: [],sheriffVotes: [],mafiaVotes: [], mafia_kill: false, nurse_saved: false})
        }
        this.setState({ gameState: cycle });
    }

    //call when websocket receinves message that user has disconeccted
    disconnect(user) {
        console.log(`removing user ${user} from user list!`);
        this.setState({
            users: this.state.users.filter(function (filteree) {
                return filteree !== user
            })
        });
        console.log('users: ', this.state.users);
    }

    addUser(user) {
        if (user !== this.props.currentUser) {
            this.setState({ users: [...this.state.users, user] });
            console.log('adding user to state: ', user, this.state.users);

        }
    }

    render() {
        return (
            <div>
                {
                    this.state.is_alive === true ?
                        this.state.gameState === 'Lobby' ?
                            <div className="Lobby">

                                <Lobby
                                    users={this.state.users}
                                    currentUser={this.props.currentUser}
                                    show={this.state.playersShow}
                                    onHide={() => this.setState({ playersShow: false })}
                                />
                                {this.props.isHost === true ?
                                    <div className="Lobby">
                                        <Button onClick={() => this.setState({ instructionShow: true })} variant={"secondary"} type={"button"} className="instructionsButton">INSTRUCTIONS</Button>
                                        <Instructions
                                            show={this.state.instructionShow}
                                            onHide={() => this.setState({ instructionShow: false })}
                                        />
                                      <Button onClick={() => this.startGame()} className="startButton">START</Button>

                                    </div>
                                    :
                                    <div className="Lobby">
                                        <Button onClick={() => this.setState({ instructionShow: true })} variant={"secondary"} type={"button"} className="instructionsButton">INSTRUCTIONS</Button>
                                        <Button disabled={() => this.startGame()} className="startButton">STARTING SOON...</Button>
                                        <Instructions
                                            show={this.state.instructionShow}
                                            onHide={() => this.setState({ instructionShow: false })}
                                        />
                                    </div>}
                                <div className="secretCodeContainer">
                                  <p>SECRET CODE:</p>
                                  <h1>{this.props.roomID}</h1>
                                </div>
                            </div>
                            :
                            this.state.gameState === 'Nightime' ?
                                this.props.isHost === true ?
                                    <button onClick={() => this.resolve_votes()} className="p_button">Change Cycle</button>
                                    :
                                    <UserNightComponent
                                        mafiaVotes={this.state.mafiaVotes}
                                        nurseVotes={this.state.nurseVotes}
                                        sheriffVotes={this.state.sheriffVotes}
                                        role={this.state.role}
                                        handleVote={this.handleVote}
                                        handleQuizVote={this.handleQuizVote}
                                        handleSpecialAbility={this.handleSpecialAbility}
                                        handleCycleChange={this.handleCycleChange}
                                        aliveUsers={this.state.aliveUsers}
                                        currentUser={this.props.currentUser}
                                        prevVote={this.state.prevVote}
                                        />


                                :
                                <UserDayComponent
                                    aliveUsers={this.state.aliveUsers}
                                    role={this.state.role}
                                    accused={this.state.accused}
                                    currentUser={this.props.currentUser}
                                    trialVotes={this.state.trialVotes}
                                    resolve_votes={this.resolve_votes}
                                    gameState={this.state.gameState}
                                />
                    :
                    <div className="deadScreenContainer">
                      <Image className="deadScreen" src="/images/DeadScreen.png"></Image>
                    </div>
                    }
                </div>
            );
        }
}
