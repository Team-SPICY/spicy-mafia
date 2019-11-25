import React, { Component } from 'react';
import './Mafia.css'
import FlipCard from 'react-flipcard';
import { Card, Modal, Button, ListGroup, Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/Image";

class MafiaVote extends Component {
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

    renderVotes = (user) => {
        //TODO use civilian users
        var votes = 0;
        const voted_for = this.props.votedFor;
        const aliveUsers = this.props.aliveUsers;
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

    renderUsers = () => {
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
                                    <ul className='list-group list-group-flush mafia-list'>
                                        {
                                            this.renderMafia()}
                                        {
                                            this.renderUsers()
                                        }
                                    </ul>
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

export default MafiaVote;
