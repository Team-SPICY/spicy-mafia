import React, { Component } from 'react';
import axios from 'axios'
import './Cycles.css';
import FlipCard from 'react-flipcard';
import Image from "react-bootstrap/Image";
//import WebSocketInstance from '../../services/WebSocket';
import NarratorDay from './NarratorDay';
import DayVote from '../Vote/DayVote';
import NewsFlash from './NewsFlash';

import {Button} from 'react-bootstrap'
import PlayerList from "../Game/PlayerList";
import Instructions from '../Game/Instructions'

class UserDayComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsShow: true,
        };

    }
    render() {
        return (
            <div className="Daytime">
                <NewsFlash
                    mafia_kill={this.props.mafia_kill}
                    show={this.state.newsShow}
                    onHide={() => this.setState({ newsShow: false })}
                    nurse_saved={this.props.nurse_saved}
                    sheriff={this.props.sheriff}
                    winner={this.props.winner}
                    quizQuestion={this.props.quizQuestion}
                />
                {
                    this.props.role === 'host' ?
                        <NarratorDay
                            aliveUsers={this.props.aliveUsers}
                            role={this.props.role}
                            currentUser={this.props.currentUser}
                            trialVotes={this.props.trialVotes}
                            resolve_votes={this.props.resolve_votes}
                        />
                        :
                        <div>
                        <DayVote
                            aliveUsers={this.props.aliveUsers}
                            role={this.props.role}
                            accused={this.props.accused}
                            currentUser={this.props.currentUser}
                            trialVotes={this.props.trialVotes}
                            gameState={this.props.gameState}
                        />
                          <div className="ingameButtonContainer">
                            <Button onClick={() => this.setState({ instructionShow: true })} variant={"secondary"} type={"button"} className="instructionsButton">INSTRUCTIONS</Button>
                              <Instructions
                                  show={this.state.instructionShow}
                                  onHide={() => this.setState({ instructionShow: false })}
                              />
                            <Button className="playerListButton" onClick={() => this.setState({ playersShow: true })}>PLAYER LIST</Button>
                              <PlayerList
                                  users={this.props.users}
                                  currentUser={this.props.currentUser}
                                  show={this.state.playersShow}
                                  onHide={() => this.setState({ playersShow: false })}
                              />
                          </div>
                        </div>

                }
            </div>
        );
    }
}
export default UserDayComponent;
