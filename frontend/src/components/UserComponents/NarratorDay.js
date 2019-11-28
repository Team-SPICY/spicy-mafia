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
            accused_player: "Joe Moma"
          };
    }

    resolve_day_votes() {
        WebSocketInstance.sendMessage({ 'command': 'resolve_votes',
                                        'cycle': 'Daytime',
                                        'accused_player': this.state.accused_player,
                                        'alive_users': this.props.aliveUsers,
                                        })
        WebSocketInstance.sendMessage({ 'command': 'change_cycle', 'cycle': 'Daytime' })
    }

    // recieve vote and reflect that vote

    render() {
        return (
            <div className={"Narrator"}>
                <h1>NARRATOR</h1>
                <Card bsPrefix="narratorCardContainer" style={{ width: '18rem' }}>
                    <Card.Body bsPrefix="narratorCardBody">
                        <Card.Title bsPrefix="narratorCardTitle">WHO TO ACCUSE?</Card.Title>
                        <Form bsPrefix="narratorCardForm">
                        <fieldset className="formSuspects">
                        {
                            Object.keys(this.props.aliveUsers)
                            .filter((name) => {return this.props.aliveUsers[name] !== 'host'})
                            .map( (name) =>
                                <Form.Check bsPrefix="narratorFormCheck"
                                    type="radio"
                                    id={`default-${name}`}
                                    label={`${name}`}
                                    name="formSuspects"
                                    onClick={() => this.setState({accused_player: name}) }
                                />
                            )
                        }
                        </fieldset>
                        </Form>
                        <div className="submitButtonContainer">
                          <Button onClick={() => WebSocketInstance.sendMessage({ 'command': 'on_accusation', 'accused': this.state.accused_player })}
                              variant="secondary">SUBMIT</Button>
                        </div>

                        <fieldset className="formPeopleVotes">
                          <Card.Title bsPrefix="peopleSayTitle">THE PEOPLE SAY:</Card.Title>
                          {
                              Object.keys(this.props.trialVotes)
                              .map( (name) =>
                                  <Card.Text> {name}: {this.props.trialVotes[name]}</Card.Text>
                              )
                          }
                        </fieldset>

                        <div className="changeCycleButtonContainer">
                          <Button onClick={() => this.resolve_day_votes()}>Change Cycle</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }

}
