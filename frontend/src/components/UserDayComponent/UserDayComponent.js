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
                            playersShow={this.props.playerShow}
                            instructionShow={this.props.instructionShow}
                            users={this.props.users}
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
                            users={this.props.users}
                            instructionShow={this.props.instructionShow}
                            playersShow={this.props.playersShow}
                        />

                        </div>

                }
            </div>
        );
    }
}
export default UserDayComponent;
