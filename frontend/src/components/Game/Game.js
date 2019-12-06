import React, { Component } from 'react';
import './Game.css';
import axios from 'axios'
import PlayerList from "./PlayerList";
import Lobby from '../Lobby/Lobby'
import UserNightComponent from '../UserNightComponent';
import UserDayComponent from '../UserDayComponent/UserDayComponent';
import '../UserDayComponent/Cycles.css'
import { Modal, Button, ListGroup } from 'react-bootstrap'
import Image from "react-bootstrap/Image";
import WebSocketInstance from '../../services/WebSocket'
import Instructions from './Instructions'

export default class Game extends Component {
    constructor(props) {
        super(props);
        //bind handle vot function
        this.handleVoteRecieved = this.handleVoteRecieved.bind(this);
        this.handleVote = this.handleVote.bind(this);
        this.startGame = this.startGame.bind(this);
        this.resolve_votes = this.resolve_votes.bind(this);

        this.state = {
            users: [],
            //update alive users after a gameState change(someone is killed/executed)
            winner: "",
            aliveUsers: {},
            nurseVotes: [],
            sheriffVotes: [],
            mafiaVotes: [],
            civilianVotes: [],
            playersShow: false,
            instructionShow: false,
            gameState: 'Lobby',
            role: 'civilian',
            isHost: this.props.isHost,
            flipped: false,
            prevVote: "",
            accused: '',
            trialVotes: {},
            mafiaKill: "",
            nurseSaved: "",
            successful_investigation: false,
            is_alive: true,
            quizQuestion: "",
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
                this.quizQuestionCallBack.bind(this)
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
            this.setState({ is_alive: false })
        }
    }
    quizQuestionCallBack(question) {
        this.setState({ quizQuestion: question });
    }
    // set state to new accused
    handleAccused(accused_name) {

        this.setState({ accused: accused_name });
        this.setState({ trialVotes: {} });
        console.log(`Accused player: ${accused_name}`);
    }

    handleTrialVote(playername, vote) {
        const votesCopy = this.state.trialVotes;
        votesCopy[playername] = vote;
        this.setState({ trialVotes: votesCopy });
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
                    var lobby = "http://127.0.0.1:8000/api/lobby/" + this.props.roomID + "/"
                    axios.get(lobby)
                        .then(response => {
                            var qq = response['data']['quizQuestions'];
                            var lengthQ = Object.keys(qq).length;
                            var ran = Math.round(Math.random() * (lengthQ - 1));
                            console.log('printing quiz questions', qq, ' printing length: ', lengthQ, 'ran: ', ran);
                            const question = qq[ran]
                            const data = {
                                'command': 'new_quiz',
                                'question': question
                            };
                            console.log('sendingQuizQuestion')
                            WebSocketInstance.sendMessage(data);
                        });
                }
            })
    }

    resolve_votes() {
        if (this.state.gameState === "Nightime") {
            WebSocketInstance.sendMessage({
                'command': 'resolve_votes',
                'cycle': this.state.gameState,
                'role': this.state.role,
                'alive_users': this.state.aliveUsers,
                'mafia_votes': this.state.mafiaVotes,
                'sheriff_votes': this.state.sheriffVotes,
                'nurse_votes': this.state.nurseVotes,
                'civilian_votes': this.state.civilianVotes
            })
        }
        //changing from daytime to nightime, get a new quiz question for the night
        if (this.state.gameState === 'Daytime') {
            var lobby = "http://127.0.0.1:8000/api/lobby/" + this.props.roomID + "/"
            axios.get(lobby)
                .then(response => {
                    var qq = response['data']['quizQuestions'];
                    var lengthQ = (Object.keys(qq)).length;
                    console.log('printing quiz questions', qq, ' printing length: ', lengthQ);
                    var ran = Math.round(Math.random() * (lengthQ - 1));
                    const question = qq[ran]
                    const data = {
                        'command': 'new_quiz',
                        'question': question
                    };
                    console.log('sendingQuizQuestion')
                    WebSocketInstance.sendMessage(data);
                });
        }
        WebSocketInstance.sendMessage({ 'command': 'change_cycle', 'cycle': this.state.gameState })
    }

    updatePlayers(mafia_kill, nurse_saved, successful_investigation, alive_users, winner) {
        console.log("updating results from previous cycle and winner of votes");
        console.log("new_alive_players ", alive_users, 'winner: ', winner, ' nurse save: ', nurse_saved, ' mafiakill ', mafia_kill);
        this.setState({ mafiaKill: mafia_kill, nurseSaved: nurse_saved, successful_investigation: successful_investigation, aliveUsers: alive_users, civilianVotes: [], prevVote: "", winner: winner });
        console.log('state after updating: ', this.state.nurseSaved, this.state.mafiaKill)
        if (!(this.props.currentUser in alive_users)) {
            this.setState({ is_alive: false })
        }
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
            } else if (role === 'civilian') {
                voted_for = this.state.civilianVotes;
                if (prev_voted !== "") {
                    var index = voted_for.indexOf(prev_voted);
                    voted_for.splice(index, 1);
                }
                voted_for = [...voted_for, voted];
                this.setState({ civilianVotes: voted_for });
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
            this.setState({ nurseVotes: [], sheriffVotes: [], mafiaVotes: [], mafia_kill: false, nurse_saved: false })
        }
        this.setState({ gameState: cycle });
    }

    //call when websocket receinves message that user has disconeccted
    disconnect(user, is_Host, newHost) {
        console.log(`removing user ${user} from user list!`);
        //update state of users to reflect that the a player left
        this.setState({
            users: this.state.users.filter(function (filteree) {
                return filteree !== user
            })
        });
        console.log('users: ', this.state.users);

        //if the currentUser is the new host
        if (is_Host == true && this.props.currentUser == newHost && this.state.gameState == 'Lobby'){
          //set currentUser isHost state to true
          console.log('SETTING NEW HOST STATE')
          this.setState({isHost: true})
        }
        else if (is_Host == true && this.state.gameState !== 'Lobby'){
          //if host leaves in game, everybody is kicked out
          console.log('EVERYBODY LEAVE THE GAME')
          window.location.reload()
        }
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
                            <div>
                                <Lobby
                                    users={this.state.users}
                                    currentUser={this.props.currentUser}
                                    isHost={this.state.isHost}
                                    roomID={this.props.roomID}
                                    startGame={this.startGame}
                                />
                                <div className="numPlayersContainer">
                                    {
                                        this.state.users.length === 1 ?
                                            <p>{this.state.users.length} SUSPECT</p>
                                            :
                                            <p>{this.state.users.length} SUSPECTS</p>
                                    }
                                </div>
                            </div>
                            :
                            this.state.gameState === 'Nightime' ?
                                <UserNightComponent
                                    mafiaVotes={this.state.mafiaVotes}
                                    civilianVotes={this.state.civilianVotes}
                                    quizQuestion={this.state.quizQuestion}
                                    nurseVotes={this.state.nurseVotes}
                                    sheriffVotes={this.state.sheriffVotes}
                                    role={this.state.role}
                                    handleVote={this.handleVote}
                                    handleCycleChange={this.handleCycleChange}
                                    aliveUsers={this.state.aliveUsers}
                                    currentUser={this.props.currentUser}
                                    prevVote={this.state.prevVote}
                                    resolve_votes={this.resolve_votes}
                                    users={this.state.users}
                                    playerShow={this.state.playersShow}
                                    instructionShow={this.state.playersShow}
                                />
                                :
                                this.state.gameState === 'mafia_win' ?
                                    <div>
                                        <h1 class="messageMafia">MAFIA WON!</h1>
                                        <Image className="messengerImage" src="/images/GaryCard.png"></Image>
                                    </div>
                                    :
                                    this.state.gameState === 'civilian_win' ?
                                        <div>
                                            <h1 class="messageCivilian">CIVILIANS WON!</h1>
                                            <Image className="messengerImage" src="/images/GaryCard.png"></Image>
                                        </div>
                                        :
                                        <UserDayComponent
                                            aliveUsers={this.state.aliveUsers}
                                            role={this.state.role}
                                            accused={this.state.accused}
                                            currentUser={this.props.currentUser}
                                            trialVotes={this.state.trialVotes}
                                            mafia_kill={this.state.mafiaKill}
                                            nurse_saved={this.state.nurseSaved}
                                            sheriff={this.state.successful_investigation}
                                            winner={this.state.winner}
                                            quizQuestion={this.state.quizQuestion}
                                            users={this.state.users}
                                            playerShow={this.state.playersShow}
                                            instructionShow={this.state.playersShow}
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
