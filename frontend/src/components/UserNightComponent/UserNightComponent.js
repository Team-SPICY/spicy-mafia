import React, { Component } from 'react';
import Vote from '../Vote';
import NarratorNight from '../NarratorNightComponent';

class UserNightComponent extends Component {
    constructor(props) {
        super(props);
        console.log('role for user: ', this.props.role);
        this.state = {
            voted: false,
            backgroundSrc: '',
            description: '',
            NurseDescription: 'You Are A Nurse',
            SheriffDescription: 'You Are A Sheriff',
            CivilianDescription: 'You Are A Civilian',
            MafiaDescription: 'You Are A Mafioso',
            HostDescription: 'You are the host. You observe all, but say nothing.'
        };
    }
    componentDidMount() {
        this.setBackground();
    }

    //render function for nurse
    setBackground() {
        console.log('setting role: ', this.props.role)
        const role = this.props.role;
        if (role === 'civilian') {
            this.setState({ backgroundSrc: "/images/CivilianCard.png", description: this.state.CivilianDescription });
        }
        else if (role === 'sheriff') {
            this.setState({ backgroundSrc: "/images/SheriffCard.png", description: this.state.SheriffDescription });
        }
        else if (role === 'nurse') {
            this.setState({ backgroundSrc: "/images/NurseCard.png", description: this.state.NurseDescription });

        }
        else if (role === 'mafia') {
            this.setState({ backgroundSrc: "/images/MafiaCard.png", description: this.state.MafiaDescription });

        }
        else {
            this.setState({ backgroundSrc: "/images/card.png", description: this.state.HostDescription });
        }
        console.log('set descriptions ', this.state.description)

    }

    changeVoteHandler = (e) => {
        this.setState({
            voted: e.target.value
        });
    }

    render() {
        return (
            <div>
                {this.props.role === 'host' ?
                    <div>
                        <button onClick={() => this.props.resolve_votes()} className="p_button">Change Cycle</button>
                        <NarratorNight
                            resolve_votes={this.props.resolve_votes}
                            backgroundSrc={this.state.backgroundSrc}
                            mafiaVotes={this.props.mafiaVotes}
                            sheriffVotes={this.props.sheriffVotes}
                            civilianVotes={this.props.civilianVotes}
                            nurseVotes={this.props.nurseVotes}
                            role={this.props.role}
                            handleVote={this.props.handleVote}
                            handleQuizVote={this.props.handleQuizVote}
                            aliveUsers={this.props.aliveUsers}
                            currentUser={this.props.currentUser}
                            prevVote={this.props.prevVote}
                        />
                    </div>
                    :
                    <Vote
                        backgroundSrc={this.state.backgroundSrc}
                        mafiaVotes={this.props.mafiaVotes}
                        sheriffVotes={this.props.sheriffVotes}
                        civilianVotes={this.props.civilianVotes}
                        nurseVotes={this.props.nurseVotes}
                        role={this.props.role}
                        handleVote={this.props.handleVote}
                        handleQuizVote={this.props.handleQuizVote}
                        aliveUsers={this.props.aliveUsers}
                        currentUser={this.props.currentUser}
                        prevVote={this.props.prevVote}
                    />

                }
            </div>
        );
    }
}
export default UserNightComponent;