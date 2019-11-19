import React, { Component } from 'react';
import './App.css';
import Game from './components/Game'
import Home from './components/Home'
import WebSocketInstance from './services/WebSocket'
import axios from 'axios'
import Card from 'react-bootstrap/Card';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      roomID: '',
      loggedIn: false,
    };
  }

  usernameChangeHandler = (event) => {
    console.log('e, ', event)
    console.log('value: ', event.target.value)
    this.setState({
      username: event.target.value
    })
  }

  roomChangeHandler = (event) => {
    this.setState({
      roomID: event.target.value
    })
  }

  handleLoginSubmit = (username, roomID, e) => {
    console.log('handling login submit')
    e.preventDefault();
    console.log(username, roomID);
    axios.get('http://127.0.0.1:8000/api/lobby/')
      .then(res => {
        const rooms = res['data'];
        console.log('rooms: ', rooms);
        if (roomID in rooms) {
          //connect to websockets, new websocket based on the roomID
          WebSocketInstance.connect(username, roomID);
          this.setState({ loggedIn: true, username: username, roomID: roomID });
          console.log(`room ${roomID} is in api/lobby[rooms], users: ${this.state.users}`);
        }
        else {
          alert('room does not exist!');
        }
      })
  }

  handleCreateGame = () => {
    const username = this.state.username;
    if (username.length === 0) {
      alert('Enter a username!');
    }
    else {
      console.log('game being made for: ', username);
      //hit lobby api and use the returned lobby room number for roomID

      const roomID = 'spcy'
      this.setState({ loggedIn: true, username: username, roomID: roomID });
      WebSocketInstance.connect(username, roomID);
    }

  }

  render() {
    const {
      loggedIn,
      username,
      roomID,
    } = this.state;

    return (
      <div className="App">
        {
          loggedIn ?
            <Game
              currentUser={username}
              roomID={roomID}
            />
            :
            <Home
              onSubmit={this.handleLoginSubmit}
              handleCreateGame={this.handleCreateGame}
              usernameChangeHandler={this.usernameChangeHandler}
              roomChangeHandler={this.roomChangeHandler}
            />
        }
      </div>
    );
  }
}

