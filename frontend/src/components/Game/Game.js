import React, { Component } from 'react';
import './Game.css';
import axios from 'axios'
import PlayerList from "./PlayerList";
import Lobby from '../Lobby/Lobby'
import UserNightComponent from '../UserComponents';
import UserDayComponent from '../UserComponents';
import '../UserComponents/Cycles.css'

import Flipcard from '@kennethormandy/react-flipcard'
import { Modal, Button, ListGroup } from 'react-bootstrap'

import '@kennethormandy/react-flipcard/dist/Flipcard.css'

import Image from "react-bootstrap/Image";
import WebSocketInstance from '../../services/WebSocket'
import Instructions from './Instructions'

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            playersShow: false,
            gameState: 'Lobby',
            role: 'Civilian',
            isHost: false,
            flipped: false,
            instructionShow: false
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
            WebSocketInstance.addCallbacks(this.handleVoteRecieved.bind(this), this.handleCycleChange.bind(this), this.addUser.bind(this), this.disconnect.bind(this), this.setRole.bind(this));
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

    //call back when websocket recieves role
    setRole(role) {
        this.setState({ role: role });
    }

    //handle votes from sherrif or nurse
    handleSpecialAbility() {
        console.log('handling special ability');

        //send to api vote

    }

    handleQuizVote() {
        console.log('handling quiz vote');
    }

    //handle a vote recieved from websocket
    handleVoteRecieved(parsedData) {
        const voter = parsedData.voter;
        const voted = parsedData.voter;
        //based on the game cycle pass this vote to appropriate function
        //if day cycle pass vote to handle fucntion to render to vote list
        //if night cycle, check what role this player is(should be mafia)
    }

    //handle a vote submitted
    handleVote(voter, voted) {
        const data = {
            'command': 'send_vote',
            'voter': voter,
            'voted': voted,
        };
        //send vote to websocket
        WebSocketInstance.sendVote(data);
        console.log('vote submmitted');
    }

    //handle day night cycle change, param state should be the new state to enter
    handleCycleChange(state) {
        console.log('cycle change initiated');
        this.setState({ state: state });
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
                    this.state.gameState === 'Lobby' ?
                        <div className="Lobby">

                              <button onClick={() => this.setState({ instructionShow: true })} variant={"secondary"} type={"button"} className="i_button">INSTRUCTIONS</button>
                              <Instructions
                                show={this.state.instructionShow}
                                onHide={() => this.setState({ instructionShow: false })}
                              />
                              <button onClick={() => this.setState({ gameState: 'Game' })} className="p_button">START</button>
                              <Lobby
                                users={this.state.users}
                                currentUser={this.props.currentUser}
                                show={this.state.playersShow}
                                onHide={() => this.setState({ playersShow: false })}
                                />

                        </div>
                        :
                        this.state.gameState === 'Nightime' ?
                            <UserNightComponent
                                role={this.state.role}
                                handleVote={this.handleVote}
                                handleQuizVote={this.handleQuizVote}
                                handleVoteRecieved={this.handleVoteRecieved}
                                handleSpecialAbility={this.handleSpecialAbility}
                            />
                            :
                            <UserDayComponent
                                handleVote={this.handleVote}
                                handleVoteRecieved={this.handleVoteRecieved}
                            />
                }

                {
                    this.state.gameState !== 'Lobby' ?
                        <div>
                            <button onClick={() => this.setState({ instructionShow: true })} variant={"secondary"} type={"button"} className="i_button">INSTRUCTIONS</button>
                            <Instructions
                              show={this.state.instructionShow}
                              onHide={() => this.setState({ instructionShow: false })}
                            />
                            <button className="p_button"
                                onClick={() => this.setState({ playersShow: true })}>PLAYER LIST</button>
                            <PlayerList
                                users={this.state.users}
                                currentUser={this.props.currentUser}
                                show={this.state.playersShow}
                                onHide={() => this.setState({ playersShow: false })}
                            />
                        </div>
                        :
                        null
                }
            </div>
        );
    }
}
