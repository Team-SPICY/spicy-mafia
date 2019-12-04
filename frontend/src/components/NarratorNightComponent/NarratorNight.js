import React, { Component } from 'react';
import FlipCard from 'react-flipcard';
import ListGroup from "react-bootstrap/ListGroup";
import { Card, Modal, Button, Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import './NarratorNight.css';

class NarratorNight extends Component {
    constructor(props) {
        super(props);
        console.log('role for user :', this.props.currentUser, this.props.role);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleOnFlip = this.handleOnFlip.bind(this);
        this.showFront = this.showFront.bind(this);
        this.showBack = this.showBack.bind(this);
        this.backButton = React.createRef();
        this.state = {
            isFlipped: false,

        };
    }


    showBack() {
        this.setState({ isFlipped: true });
    }

    showFront() {
        this.setState({ isFlipped: false });
    }


    handleOnFlip(flipped) {
        if (flipped) {
            this.backButton.current.focus();
        }
    }

    handleKeyDown(e) {
        if (this.state.isFlipped && e.keyCode === 27) {
            this.showFront();
        }
    }
    renderMafiaStats() {
        var num = 0
        const users_keys = Object.keys(this.props.aliveUsers);
        const users = this.props.aliveUsers;
        users_keys.forEach(function (user) {
            if (users[user] === 'mafia') {
                num++;
            }
        });
        const votes = this.props.mafiaVotes;
        const numVotes = votes.length;
        return (<ListGroup.Item>Mafia Votes:{numVotes}/{num}</ListGroup.Item>)

    }
    renderCivilianStats() {
        var num = 0
        const users_keys = Object.keys(this.props.aliveUsers);
        const users = this.props.aliveUsers;
        users_keys.forEach(function (user) {
            if (users[user] === 'civilian') {
                num++;
            }
        });
        const votes = this.props.civilianVotes;
        const numVotes = votes.length;
        return (<ListGroup.Item>Civilian Votes: {numVotes}/{num}</ListGroup.Item>)

    }

    renderNurseStats() {
        var num = 0
        const users_keys = Object.keys(this.props.aliveUsers);
        const users = this.props.aliveUsers;
        users_keys.forEach(function (user) {
            if (users[user] === 'nurse') {
                num++;
            }
        });
        const votes = this.props.nurseVotes;
        const numVotes = votes.length;
        return (<ListGroup.Item>Nurse Votes: {numVotes}/{num}</ListGroup.Item>)
    }

    renderSheriffStats() {
        var num = 0
        const users_keys = Object.keys(this.props.aliveUsers);
        const users = this.props.aliveUsers;
        users_keys.forEach(function (user) {
            if (users[user] === 'sheriff') {
                num++;
            }
        });
        const votes = this.props.sheriffVotes;
        const numVotes = votes.length;
        return (<ListGroup.Item>Sheriff Votes: {numVotes}/{num}</ListGroup.Item>)

    }



    render() {
        return (<div>
            <Container fluid={true}>
                <Row>
                    <Col xs={6} md={7}>
                        <FlipCard
                            disabled={true}
                            flipped={this.state.isFlipped}
                            onFlip={this.handleOnFlip}
                            onKeyDown={this.handleKeyDown}
                        >
                            <div onClick={this.showBack} >
                                <img src={this.props.backgroundSrc} width={" "} height={"600"} />
                                <div className='vote-stats'>
                                    <h3 className='voting-stats-header'>Voting Stats - Don't Snitch!</h3>
                                    <ListGroup variant="flush">
                                        {this.renderMafiaStats()}
                                        {this.renderNurseStats()}
                                        {this.renderSheriffStats()}
                                        {this.renderCivilianStats()}
                                    </ListGroup>
                                </div>
                                <div className="changeCycleButtonContainer">
                                  <Button onClick={this.props.resolve_votes} className="changeCycleButton">Change Cycle</Button>
                                </div>
                            </div>
                            <div ref={this.backButton} onClick={this.showFront} >
                                {
                                    <img src={this.props.backgroundSrc} width={" "} height={"600"} />
                                }

                            </div>
                        </FlipCard>
                    </Col>
                </Row>
            </Container>
        </div >
        );
    }
}
export default NarratorNight;
