import React, { Component } from 'react';
import './Game.css';
import axios from 'axios'
import PlayerList from "./PlayerList";
import FlipCard from '@kennethormandy/react-flipcard';

import Image from "react-bootstrap/Image";

import WebSocketInstance from '../../services/WebSocket'

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            playersShow: false,
            gameState: 'night'
        };

        this.waitForSocketConnection(() => {
            //hit lobby api to get users in lobby and set state
            axios.get('http://127.0.0.1:8000/api/lobby/')
                .then(res => {
                    const rooms = res['data'];
                    console.log('rooms: ', rooms);
                    const db_users = rooms[this.props.roomID]['players'];
                    console.log('users from api: ', db_users);
                    this.setState({ users: [...this.state.users, ...db_users] });
                    console.log(`users: ${this.state.users}`);
                })
            WebSocketInstance.joining(this.props.currentUser);
            WebSocketInstance.addCallbacks(this.handleVote.bind(this), this.handleCycleChange.bind(this), this.addUser.bind(this), this.disconnect.bind(this));
        });
    }

    waitForSocketConnection(callback) {
        const component = this;
        setTimeout(
            function () {
                // Check if websocket state is OPEN
                if (WebSocketInstance.state() === 1) {
                    console.log("Connection is made")
                    callback();
                    return;
                } else {
                    console.log("wait for connection...")
                    component.waitForSocketConnection(callback);
                }
            }, 100); // wait 100 milisecond for the connection...
    }

    //handle a vote submitted
    handleVote() {
        console.log('vote submmitted');
    }

    //handle day night cycle change
    handleCycleChange() {
        console.log('cycle change initiated');
    }

    //call when websokcet receinves message that user has disconeccted
    disconnect(user) {
        console.log(`removing user ${user} from user list!`);
        this.setState({
            users: this.state.users.filter(function (filteree) {
                return filteree !== user
            })
        });
        console.log('users: ', this.state.users);
    }

    addUser(user) {
        console.log('adding user to state: ', user, this.state.users);
        this.setState({ users: [...this.state.users, user] });
    }

    messageChangeHandler = (event) => {
        this.setState({
            message: event.target.value
        })
    }

    sendMessageHandler = (e, message) => {
        const messageObject = {
            from: this.props.currentUser,
            text: message
        };
        WebSocketInstance.newChatMessage(messageObject);
        this.setState({
            message: ''
        })
        e.preventDefault();
    }
    //call this after getting users from firebase
    //renderUsers = (users) => { }

    //call this when a new user joins in real time
    renderUsers = () => {
        const currentUser = this.props.currentUser;
        const users = this.state.users;
        console.log(currentUser, users);
        return users.map((user, i) => <li key={user} className={user === currentUser ? 'me' : 'him'}> <p>{user}</p></li>);
    }

    renderMessages = (messages) => {
        const currentUser = this.props.currentUser;
        return messages.map((message, i) => <li key={message.id} className={message.author === currentUser ? 'me' : 'him'}> <h4 className='author'>{message.author} </h4><p>{message.content}</p></li>);
    }

    render() {
        const {
            users,
        } = this.state;

        return (
            <div className="Nightime">
                <FlipCard >
                    <div >
                        <Image src="/images/card.png" width={" "} height={"600"} />
                    </div>
                    <div >
                        <Image src="/images/card.png" width={" "} height={"600"} />
                    </div>

                </FlipCard>
                <div>
                    <button variant={"secondary"} type={"button"} className="i_button">INSTRUCTIONS</button>
                    <button className="p_button"
                        onClick={() => this.setState({ playersShow: true })}>PLAYER LIST</button>
                    <PlayerList
                        users={users}
                        currentUser={this.props.currentUser}
                        show={this.state.playersShow}
                        onHide={() => this.setState({ playersShow: false })}
                    />
                </div>
            </div>
        );
    }
}
