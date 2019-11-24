import React, { Component } from 'react';


import MafiaVote from '../Vote';


export class UserNightComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            voted: false,
            backgroundSrc: '',
            description: '',
            NurseDescription: 'You Are A Nurse',
            SheriffDescription: 'You Are A Sheriff',
            CivilianDescription: 'You Are A Civilian',
            MafiaDescription: 'You Are A Mafioso',
        };
    }
    componentDidMount() {
        this.setBackground();
    }

    //render function for nurse
    setBackground() {
        console.log('setting role: ', this.props.role)
        const role = this.props.role;
        if (role === 'Civilian') {
            this.setState({ backgroundSrc: "/images/CivilianCard.png", description: this.state.CivilianDescription });
        }
        else if (role === 'Sheriff') {
            this.setState({ backgroundSrc: "/images/SheriffCard.png", description: this.state.SheriffDescription });
        }
        else if (role === 'Nurse') {
            this.setState({ backgroundSrc: "/images/NurseCard.png", description: this.state.NurseDescription });

        }
        else {
            this.setState({ backgroundSrc: "/images/card.png", description: this.state.MafiaDescription });
        }
        console.log('setting role: ', role, this.state.description)

    }

    changeVoteHandler = (e) => {
        this.setState({
            voted: e.target.value
        });
    }

    recieveVoteHandler(data) {
        console.log('someone has voted for something');
    }

    render() {
        return (
            <div>
                {
                    this.props.role === 'mafia' ?
                        <MafiaVote
                            backgroundSrc={this.state.backgroundSrc}
                            votedFor={this.props.votedFor}
                            role={this.props.role}
                            handleVote={this.props.handleVote}
                            handleQuizVote={this.props.handleQuizVote}
                            handleVoteRecieved={this.props.handleVoteRecieved}
                            aliveUsers={this.props.aliveUsers}
                            mafiosos={this.props.mafiosos}
                            currentUser={this.props.currentUser}
                            prevVote={this.props.prevVote}
                        />
                        :
                        <p>you are {this.props.role}</p>
                }
            </div>

        );
    }
}
export default UserNightComponent;
