import React, { Component } from 'react';

import Image from 'react-bootstrap/Image';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './DayVote.css';

import WebSocketInstance from '../../services/WebSocket';
import Instructions from "../Game/Instructions";
import Game from "../Game/Game";
import UserDayComponent from '../UserDayComponent/UserDayComponent';

import PlayerList from "../Game/PlayerList";
import {ListGroup} from 'react-bootstrap';

export default class DayVote extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    // Recieve vote and reflect that vote

    render() {
        const isAccused = this.props.accused === this.props.currentUser;
        return (
            <div className={"DayVote"}>
                <h1 className={"header"}>{this.props.currentUser}</h1>
                <Card bsPrefix="cardDay">
                    <Card.Body bsPrefix={"body"}>
                        <Card.Title bsPrefix="cardDayTitle">IS {this.props.accused} GUILTY?</Card.Title>
                        <div>
                          <div className="dayVoteButtonContainer">
                            <Button bsPrefix="buttonDayVote" onClick={() => WebSocketInstance.sendMessage({
                                'command': 'on_trial_vote',
                                playername: this.props.currentUser,
                                vote: 'Guilty!'
                            })}
                                    variant="secondary" size="lg" block disabled={isAccused}>
                                YES
                            </Button>
                            <Button bsPrefix="buttonDayVote" onClick={() => WebSocketInstance.sendMessage({
                                'command': 'on_trial_vote',
                                playername: this.props.currentUser,
                                vote: 'Innocent!'
                            })}
                                    variant="secondary" size="lg" block disabled={isAccused}>
                                NO
                            </Button>
                          </div>
                        </div>
                        <Form>

                          <div className="formPeopleVotes">
                              <Card.Title bsPrefix="peopleSayTitle">THE PEOPLE SAY</Card.Title>
                              {
                                <ListGroup bsPrefix="peopleVotesLG">
                                  {
                                  Object.keys(this.props.trialVotes)
                                      .map((name) =>
                                          <ListGroup.Item bsPrefix="peopleDayVoteItem"> {name}: {this.props.trialVotes[name]}</ListGroup.Item>
                                      )
                                    }
                                </ListGroup>
                              }
                          </div>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="ingameDayButtonContainer">
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
        )
    }
}
