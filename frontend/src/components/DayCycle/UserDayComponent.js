import React, { Component } from 'react';
import axios from 'axios'
import '../UserComponents/Cycles.css';
import FlipCard from 'react-flipcard';
import Image from "react-bootstrap/Image";
//import WebSocketInstance from '../../services/WebSocket';
import NarratorDay from '../UserComponents/NarratorDay';
import DayVote from '../Vote/DayVote';
import NewsFlash from "./NewsFlash";
import Game from "../Game/Game";

export default class UserDayComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }
    render() {
        return (
            <div className={"Daytime"}>
                {
                    this.props.role === 'host' ?
                        <NarratorDay
                            aliveUsers={this.props.aliveUsers}
                            role={this.props.role}
                            currentUser={this.props.currentUser}
                            trialVotes={this.props.trialVotes}
                        />
                        :
                        <DayVote
                            aliveUsers={this.props.aliveUsers}
                            role={this.props.role}
                            accused={this.props.accused}
                            currentUser={this.props.currentUser}
                            trialVotes={this.props.trialVotes}
                            mafia_kill={this.props.mafia_kill}
                            nurse_saved={this.props.nurse_saved}
                            sheriff_inv={this.props.successful_investigation}
                        />
                }
            </div>
        );
    }
}