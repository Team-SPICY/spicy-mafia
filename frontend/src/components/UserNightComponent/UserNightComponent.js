import React, { Component } from 'react';
import Vote from '../Vote';
import NarratorNight from '../NarratorNightComponent';
import {Button} from 'react-bootstrap'


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

    //sets background for each role
    setBackground() {
        console.log('setting role: ', this.props.role)
        const role = this.props.role;
        // if player is assigned Civilian, display civilian card
        if (role === 'civilian') {
            this.setState({ backgroundSrc: "/images/CivilianCard.png", description: this.state.CivilianDescription });
        }
        // if player is assigned Sherrif, display Sherrif card
        else if (role === 'sheriff') {
            this.setState({ backgroundSrc: "/images/SheriffCard.png", description: this.state.SheriffDescription });
        }
        // if player is assigned Nurse, display Nurse card
        else if (role === 'nurse') {
            this.setState({ backgroundSrc: "/images/NurseCard.png", description: this.state.NurseDescription });

        }
        // if player is assigned Mafia, display Mafia card
        else if (role === 'mafia') {
            this.setState({ backgroundSrc: "/images/MafiaCard.png", description: this.state.MafiaDescription });

        }
        // if player is Narrator, display Narrator card
        else {
            this.setState({ backgroundSrc: "/images/NarratorCard.png", description: this.state.HostDescription });
        }
        console.log('set descriptions ', this.state.description)

    }

    // add a vote to target player
    changeVoteHandler = (e) => {
        this.setState({
            voted: e.target.value
        });
    }

    // render function
    render() {
        return (
            <div>
                // if player is host, display game stats to narrator
                {this.props.role === 'host' ?
                    <div>
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
                            playersShow={this.props.playerShow}
                            instructionShow={this.props.instructionShow}
                            users={this.props.users}
                        />
                    </div>
                    :
                    <div>
                    <Vote
                        backgroundSrc={this.state.backgroundSrc}
                        mafiaVotes={this.props.mafiaVotes}
                        sheriffVotes={this.props.sheriffVotes}
                        civilianVotes={this.props.civilianVotes}
                        quizQuestion={this.props.quizQuestion}
                        nurseVotes={this.props.nurseVotes}
                        role={this.props.role}
                        handleVote={this.props.handleVote}
                        handleQuizVote={this.props.handleQuizVote}
                        aliveUsers={this.props.aliveUsers}
                        currentUser={this.props.currentUser}
                        prevVote={this.props.prevVote}
                        playersShow={this.props.playerShow}
                        instructionShow={this.props.instructionShow}
                        users={this.props.users}
                    />

                  </div>
                }
            </div>
        );
    }
}
export default UserNightComponent;
