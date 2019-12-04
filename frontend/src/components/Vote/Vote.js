import React, { Component } from 'react';
import './Vote.css'
import FlipCard from 'react-flipcard';
import { Card, Modal, Button, ListGroup, Container, Badge} from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/Image";
import PlayerList from "../Game/PlayerList";
import Instructions from '../Game/Instructions'

class Vote extends Component {
    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleOnFlip = this.handleOnFlip.bind(this);
        this.showFront = this.showFront.bind(this);
        this.showBack = this.showBack.bind(this);
        this.backButton = React.createRef();
        this.state = {
            isFlipped: false,

        };
    }
    initialButtonState(){
      this.setState({bgColor: 'light'})
    }
    selectedButtonState(){
      this.setState({bgColor: 'danger'})
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

    renderMafiaVotes = (user) => {
        console.log('mafia votes: ', this.props.mafiaVotes);
        //TODO use civilian users
        var votes = 0;
        const voted_for = this.props.mafiaVotes;
        voted_for.forEach(function (element) {
            if (element === user) {
                votes++;
            }
        });
        console.log('votes for user: ', user, votes)
        return votes;
    }

    renderVotes = (user) => {
        var voted_for;
        if (this.props.role === 'sheriff') {
            voted_for = this.props.sheriffVotes;
        }
        else if (this.props.role === 'mafia') {
            voted_for = this.props.mafiaVotes;
        }
        else if (this.props.role == 'civilian') {
            return null;
        }
        else (
            voted_for = this.props.nurseVotes
        )
        //TODO use civilian users
        var votes = 0;
        voted_for.forEach(function (element) {
            if (element === user) {
                votes++;
            }
        });
        console.log('votes for user: ', user, votes)
        return votes;
    }
    renderMafia = () => {
        const currentUser = this.props.currentUser;
        const aliveUsers = this.props.aliveUsers;
        var mafia_users = [];
        Object.keys(aliveUsers).forEach(key => {
            if (aliveUsers[key] === 'mafia') {
                mafia_users.push(key);
            };
        });
        console.log("alive users", aliveUsers)
        console.log("current user", currentUser)
        return mafia_users.map((user, i) => <ListGroup.Item bsPrefix="playerVoteItem" key={user} className={mafia_users[i] === currentUser ? 'me-mafia-li' : 'mafia-li'}>
            <p>{user}</p></ListGroup.Item>);
    }
    //render sheriff members without clickable activity so sheriff do not investigate themselves
    renderSheriff = () => {
        const currentUser = this.props.currentUser;
        const aliveUsers = this.props.aliveUsers;
        var sheriff_users = [];
        Object.keys(aliveUsers).forEach(key => {
            if (aliveUsers[key] === 'sheriff') {
                sheriff_users.push(key);
            };
        });

        return sheriff_users.map((user, i) => <ListGroup.Item bsPrefix="playerVoteItem" key={user} className={sheriff_users[i] === currentUser ? 'me-sheriff-li' : 'sheriff-li'}>
            <p>{user}</p></ListGroup.Item>);
    }

    //renders users who are not mafia so that mafia can vote on these users

    renderNonMafiaUsers = () => {
        var users = [];
        const currentUser = this.props.currentUser;
        const aliveUsers = this.props.aliveUsers;
        Object.keys(aliveUsers).forEach(key => {
            if (aliveUsers[key] !== 'host' && aliveUsers[key] !== 'mafia') {
                users.push(key);
            }
        });
        return users.map((user, i) => <ListGroup.Item  bsPrefix="playerVoteItem" key={user} className={'civilian'}>
            <Button onClick={() => this.props.handleVote(currentUser, user)} bsPrefix="buttonVoteNight" variant="dark">{user} <Badge variant="danger">{this.renderVotes(user)}</Badge><span className="sr-only">votes</span></Button></ListGroup.Item>);
    }
    //renders all users except the host
    renderUsers = () => {
        var users = [];
        const currentUser = this.props.currentUser;
        const aliveUsers = this.props.aliveUsers;
        if (aliveUsers[currentUser] === 'sheriff') {
            Object.keys(aliveUsers).forEach(key => {
                if (aliveUsers[key] !== 'host' && aliveUsers[key] !== 'sheriff') {
                    users.push(key);
                }
            });
        } else {
            Object.keys(aliveUsers).forEach(key => {
                if (aliveUsers[key] !== 'host') {
                    users.push(key);
                }
            });
        }
        return users.map((user, i) => <ListGroup.Item bsPrefix="playerVoteItem" key={user} className={currentUser === user ? 'me-ingame' : 'civilian'}>
            <Button onClick={() => this.props.handleVote(currentUser, user)} bsPrefix="buttonVoteNight" variant="dark">{user} <Badge  variant="danger">{this.renderVotes(user)}</Badge><span className="sr-only">votes</span></Button></ListGroup.Item>);
    }
    //
//className={key === this.state.selectedButton ? 'selected' : ''} type="button" style={{ width: '25%', border: "none" }} key={key} onClick={this.buttonSelected(key)}>{key}</button>
    render() {
        return (
            <div className="cardVoteContainer">
                <Container fluid={true}>
                    <Row>
                        <Col xs={6} md={7}>
                            <FlipCard
                                disabled={true}
                                flipped={this.state.isFlipped}
                                onFlip={this.handleOnFlip}
                                onKeyDown={this.handleKeyDown}
                            >
                                <div>
                                    <img onClick={this.showBack} src="/images/CardBack.png" width={" "} height={"600"} />
                                      <div className="ingameButtonContainer">
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
                                <div>
                                    <img ref={this.backButton} onClick={this.showFront} src={this.props.backgroundSrc} width={" "} height={"600"} />
                                    {
                                        this.props.role === 'mafia' ?
                                            <ListGroup bsPrefix='list-group list-group-flush mafia-list' variant="flush">
                                                {
                                                    this.renderMafia()
                                                }
                                                {
                                                    this.renderNonMafiaUsers()
                                                }
                                            </ListGroup>
                                            :
                                            null
                                    }
                                    {this.props.role === 'sheriff' ?

                                        <ListGroup bsPrefix='list-group list-group-flush sheriff-list' variant="flush">
                                            {
                                                this.renderSheriff()
                                            }
                                            {
                                                this.renderUsers()
                                            }
                                        </ListGroup>
                                        :
                                        null
                                    }
                                    {this.props.role === 'nurse' ?
                                        <ListGroup bsPrefix='list-group list-group-flush nurse-list' variant="flush">
                                            {
                                                this.renderUsers()
                                            }
                                        </ListGroup>
                                        :
                                        null
                                    }
                                    {
                                        this.props.role === 'civilian' ?
                                            <div>
                                                <h2 className="quizQuestionHeader">{this.props.quizQuestion}</h2>
                                                <ListGroup bsPrefix='list-group list-group-flush civilian-list' variant="flush">
                                                    {
                                                        this.renderUsers()
                                                    }
                                                </ListGroup>
                                            </div>
                                            :
                                            null
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

export default Vote;
