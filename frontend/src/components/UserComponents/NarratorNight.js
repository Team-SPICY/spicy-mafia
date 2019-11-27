import React, { Component } from 'react';
import axios from 'axios'
import './Cycles.css';
import FlipCard from 'react-flipcard';
import Image from "react-bootstrap/Image";
import WebSocketInstance from '../../services/WebSocket';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default class NarratorNight extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }
    render() {
        return (
            // This a temporary night cycle control screen for the host/narrator
            // I needed a button to switch to daytime screens
            <div className={"Nightime"}>
                <h1>Narrator Night Screen</h1>
                <Button onClick={() => WebSocketInstance.sendMessage({ 'command': 'change_cycle', 'cycle': 'Nightime' })}>CHANGE CYCLE</Button>
            </div>
        );
    }
}