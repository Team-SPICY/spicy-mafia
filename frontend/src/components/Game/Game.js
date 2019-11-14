import React, { Component } from 'react';
import './Game.css';

import WebSocketInstance from '../../services/WebSocket'

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Users: []
        };

        this.waitForSocketConnection(() => {
            WebSocketInstance.joining(this.props.currentUser);
            WebSocketInstance.addCallbacks(this.handleVote.bind(this), this.handleCycleChange.bind(this), this.addUser.bind(this), this.disconnect.bind(this));
        });
        //firebase call for users in room
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
        this.setState({
            Users: this.state.Users.filter(function (filteree) {
                return filteree !== user
            })
        });
    }

    addUser(user) {
        console.log('adding user to state: ', this.state.Users);
        this.setState({ Users: [...this.state.Users, user] });
    }

    setUsers(users) {
        this.setState({ Users: users });
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
        console.log(currentUser, this.state.Users);
        return this.state.Users.map((user, i) => <li key={user} className={user === currentUser ? 'me' : 'him'}> <p>{user}</p></li>);
    }

    renderMessages = (messages) => {
        const currentUser = this.props.currentUser;
        return messages.map((message, i) => <li key={message.id} className={message.author === currentUser ? 'me' : 'him'}> <h4 className='author'>{message.author} </h4><p>{message.content}</p></li>);
    }

    render() {
        const users = this.state.Users
        return (

            <div className='chat'>
                <div className='users'>
                    <h2>Users</h2>
                    <ul className='user_list'>
                        {
                            users &&
                            this.renderUsers(users)
                        }
                    </ul>
                </div>
            </div>
        );
    }
}