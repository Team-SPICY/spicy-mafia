import React, { Component } from 'react';
import axios from 'axios'
import './Cycles.css';
import FlipCard from 'react-flipcard';
import Image from "react-bootstrap/Image";
//import WebSocketInstance from '../../services/WebSocket';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export default class NarratorDay extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }
    render() {
        return (
            // This a temporary night cycle control screen for the host/narrator
            // I needed a button to switch to daytime screens
            <div className={"Daytime"}>
                <div>
                    <h1>NARRATOR</h1>
                    <Card>
                        <Card.Body>
                            <Card.Tile>WHO TO ACCUSE?</Card.Tile>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}
/*
<Form>
{Object.keys(this.props.aliveUsers).map(name => (
    <div key={`default-${name}`} className="mb-3">
    <Form.Check 
        type={name}
        id={`player-${name}`}
        label={`${name}`}
    />
    </div>
))}
</Form>
<Button onClick={() => WebSocketInstance.sendMessage({ 'command': 'change_cycle', 'cycle': 'Daytime' })}>CHANGE CYCLE</Button>
*/