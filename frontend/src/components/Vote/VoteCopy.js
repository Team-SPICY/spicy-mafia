import React, { Component } from 'react';
import './Mafia.css'
import FlipCard from 'react-flipcard';
import { Card, Modal, Button, ListGroup, Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/Image";

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
        else if (this.props.role === 'civilian') {
          voted_for = this.props.civilianVotes;
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

        return mafia_users.map((user, i) => <ListGroup.Item key={user} className={mafia_users[user] === currentUser ? 'me-mafia-li' : 'mafia-li'}>
            <p>{user}</p></ListGroup.Item>);
    }

    renderNonMafiaUsers = () => {
        var users = [];
        const currentUser = this.props.currentUser;
        const aliveUsers = this.props.aliveUsers;
        Object.keys(aliveUsers).forEach(key => {
            if (aliveUsers[key] !== 'host' && aliveUsers[key] !== 'mafia') {
                users.push(key);
            }
        });
        return users.map((user, i) => <ListGroup.Item key={user} className={'civilian'}>
            <button onClick={() => this.props.handleVote(currentUser, user)} type="button" className="btn btn-secondary">{user} <span class="badge badge-pill badge-dark m-3" >{this.renderVotes(user)}</span></button></ListGroup.Item>);
    }

    renderUsers = () => {
        var users = [];
        const currentUser = this.props.currentUser;
        const aliveUsers = this.props.aliveUsers;
        Object.keys(aliveUsers).forEach(key => {
            if (aliveUsers[key] !== 'host') {
                users.push(key);
            }
        });
        return users.map((user, i) => <ListGroup.Item key={user} className={currentUser === user ? 'me' : 'civilian'}>
            <button onClick={() => this.props.handleVote(currentUser, user)} type="button" className="btn btn-secondary">{user} <span class="badge badge-pill badge-dark m-3" >{this.renderVotes(user)}</span></button></ListGroup.Item>);
    }

    render() {
        return (
            <div>
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
                                </div>
                                <div ref={this.backButton} onClick={this.showFront} >
                                    {
                                        this.props.role === 'mafia' ?
                                            <h2>Who to kill</h2>
                                            <ul className='list-group list-group-flush mafia-list'>
                                                {
                                                    this.renderMafia()
                                                }
                                                {
                                                    this.renderNonMafiaUsers()
                                                }
                                            </ul>
                                            :
                                            null
                                    }
                                    {this.props.role === 'sheriff' ?
                                        <h2>Who to investigate</h2>
                                        <ul className='list-group list-group-flush sheriff-list'>
                                            {
                                                this.renderUsers()
                                            }
                                        </ul>
                                        :
                                        null
                                    }
                                    {this.props.role === 'nurse' ?
                                        <h2>Who to save</h2>
                                        <ul className='list-group list-group-flush nurse-list'>
                                            {
                                                this.renderUsers()
                                            }
                                        </ul>
                                        :
                                        null
                                    }
                                    {this.props.role === 'civilian' ?
                                        <h2></h2>
                                        <ul className='list-group list-group-flush civilian-list'>
                                          {
                                            this.renderUsers()
                                          }
                                        </ul>
                                    }


                                    <img src={this.props.backgroundSrc} width={" "} height={"600"} />
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
