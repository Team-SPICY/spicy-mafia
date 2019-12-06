import React, { Component } from 'react';

import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Cycles.css';
import './NarratorDay.css';
import NewsFlash from './NewsFlash'
import Container from 'react-bootstrap/Container';
import {ListGroup} from 'react-bootstrap'

import Form from 'react-bootstrap/Form';
import WebSocketInstance from '../../services/WebSocket';

import PlayerList from "../Game/PlayerList";
import Instructions from '../Game/Instructions'

export default class NarratorDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accused_player: "",
            newsShow: true,
        };
    }

    resolve_day_votes() {
        WebSocketInstance.sendMessage({
            'command': 'resolve_votes',
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
                <h1 className={"header"}>NARRATOR</h1>
                <Card bsPrefix="cardNarratorDay">
                    <Card.Body bsPrefix={"body"}>
                        <Card.Title bsPrefix="cardDayNarratorTitle">WHO TO ACCUSE?</Card.Title>
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

                        <div className="formPeopleVotes">
                          <Card.Title bsPrefix="concensusTitle">CONSENSUS</Card.Title>
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

                        <div className="killButton">
                            <Button onClick={() => this.resolve_day_votes()}>Kill Accused and Change Cycle</Button>
                        </div>

                    </Card.Body>
                </Card>
                <div className="ingameDayButtonContainer">
                  <Button onClick={() => this.setState({ instructionShow: true, isFlipped: false })} variant={"secondary"} type={"button"} className="instructionsButton">INSTRUCTIONS</Button>
                    <Instructions
                        show={this.state.instructionShow}
                        onHide={() => this.setState({ instructionShow: false, isFlipped: false })}
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
