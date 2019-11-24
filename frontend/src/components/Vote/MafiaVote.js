import React, { Component } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap'
import './Mafia.css'

class MafiaVote extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    renderVotes = (user) => {
        //TODO use civilian users
        var votes = 0;
        const voted_for = this.props.votedFor;
        voted_for.forEach(function (element) {
            if (element === user) {
                votes++;
            }
        });
        console.log('votes for user: ', user, votes)
        return votes;
    }

    renderUsers = () => {
        const currentUser = this.props.currentUser;
        return this.props.aliveUsers.map((user, i) => <ListGroup.Item key={user} className={user === currentUser ? "me" : 'other'}>
            <span> <button onClick={() => this.props.handleVote(currentUser, user)} type="button" className="btn btn-secondary">{user}</button><p>{this.renderVotes(user)}</p></span></ListGroup.Item>);
    }

    render() {
        return (
            <div>
                <h2>WACK SOMEBODY</h2>

                <ul className='mafia-list'>
                    {
                        this.renderUsers()
                    }
                </ul>

            </div>
        );
    }
}

export default MafiaVote;
