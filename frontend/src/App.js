import React, { Component } from 'react';
import './App.css';
import Game from './components/Game'
import Lobby from './components/Lobby'
import WebSocketInstance from './services/WebSocket'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      roomID: '',
      loggedIn: false
    };
  }

  handleLoginSubmit = (username, roomID) => {
    console.log(username, roomID)
    this.setState({ loggedIn: true, username: username, roomID: roomID });
    //connect to websockets, new websocker based on the roomID
    WebSocketInstance.connect(username, roomID);
  }

  render() {
    const {
      loggedIn,
      username
    } = this.state;

    return (
      <div className="App">
        {
          loggedIn ?
            <Game
              currentUser={username}
            />
            :
            <Lobby
              onSubmit={this.handleLoginSubmit}
              usernameChangeHandler={this.usernameChangeHandler}
              roomChangeHandler={this.roomChangeHandler}
            />
        }
      </div>
    );
  }
}