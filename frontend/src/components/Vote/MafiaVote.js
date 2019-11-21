import React, { Component } from 'react';



export default class MafiaVote extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    renderCivilians = () => {
        const users = this.props.civilians;
        const votes = this.props.mafiaVotes;
        return users.map((user, i) => <ListGroup.Item key={user} className='mafiaCivView'><p>{user}</p><p className='voteTally'>{votes[user]}</p></ListGroup.Item>
    }

    render() {
        return (
            <div>
                <h2>WACK SOMEBODY</h2>
                <ListGroup>
                    {this.renderCivilians()}
                </ListGroup>
            </div>
        );
    }
}