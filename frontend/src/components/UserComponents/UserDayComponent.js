import React, { Component } from 'react';
import axios from 'axios'
import './Cycles.css';
import FlipCard from 'react-flipcard';
import Image from "react-bootstrap/Image";
//import WebSocketInstance from '../../services/WebSocket';
import NarratorDay from './NarratorDay';
import DayVote from '../Vote/DayVote';

class UserDayComponent extends Component {
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
                    />
                }
            </div>
        );
    }
}
export default UserDayComponent;