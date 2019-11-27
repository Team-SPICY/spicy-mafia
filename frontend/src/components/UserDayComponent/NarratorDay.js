import React, { Component } from 'react';
import Flipcard from '@kennethormandy/react-flipcard'

import '@kennethormandy/react-flipcard/dist/Flipcard.css'

import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Cycles.css';
import './NarratorDay.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import WebSocketInstance from '../../services/WebSocket';

export default class NarratorDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accused_player: ""
        };
    }

    // recieve vote and reflect that vote

    render() {
        return (
            <div className={"Narrator"}>
                <h1>NARRATOR</h1>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>WHO TO ACCUSE?</Card.Title>
                        <Form>
                            <fieldset className="formSuspects">
                                {
                                    Object.keys(this.props.aliveUsers)
                                        .filter((name) => { return this.props.aliveUsers[name] !== 'host' })
                                        .map((name) =>
                                            <Form.Check
                                                type="radio"
                                                id={`default-${name}`}
                                                label={`${name}`}
                                                name="formSuspects"
                                                onClick={() => this.setState({ accused_player: name })}
                                            />
                                        )
                                }
                            </fieldset>
                        </Form>
                        <div className="submitButton">
                            <Button onClick={() => WebSocketInstance.sendMessage({ 'command': 'on_accusation', 'accused': this.state.accused_player })}
                                variant="secondary">SUBMIT</Button>
                        </div>

                        <fieldset className="formPeopleVotes">
                            <Card.Title>THE PEOPLE SAY:</Card.Title>
                            {
                                Object.keys(this.props.trialVotes)
                                    .map((name) =>
                                        <Card.Text> {name}: {this.props.trialVotes[name]}</Card.Text>
                                    )
                            }
                        </fieldset>

                    </Card.Body>
                </Card>
            </div>
        )
    }

}