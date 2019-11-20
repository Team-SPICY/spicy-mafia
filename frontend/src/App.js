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
      isHost: false,
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

  handleLoginSubmit = (e) => {
    if (this.state.username === '') {
      alert('Enter A Username!');
    }
    else {
      console.log('handling login submit')
      e.preventDefault();
      const roomID = this.state.roomID;
      const username = this.state.username;
      console.log(username, roomID);
      axios.get('http://127.0.0.1:8000/api/lobby/')
        .then(res => {
          const rooms = res['data'];
          console.log('rooms: ', rooms);
          if (roomID in rooms) {
            axios.put('http://127.0.0.1:8000/api/lobby/', { 'user': username })
              .then(res => {
                if (res['is_valid_user'] === true) {
                  this.setState({ loggedIn: true, username: username, roomID: roomID, isHost: false });
                  //connect to websockets, new websocket based on the roomID
                  WebSocketInstance.connect(username, roomID);
                  console.log(`room ${roomID} is in api/lobby[rooms], users: ${this.state.users}`);
                }
                else {
                  alert(`Username ${username} taken already!`);
                }
              })
          }
          else {
            alert('room does not exist!');
          }
        })
    }
  }

  handleCreateGame = () => {
    const username = this.state.username;
    var roomID;
    if (username.length === 0) {
      alert('Enter a username!');
    }
    else {
      console.log('game being made for: ', username);
      //hit lobby api and use the returned lobby room number for roomID
      axios.post('http://127.0.0.1:8000/api/lobby/', { 'user': username })
        .then(res => {
          roomID = res['data'][0]['lobby_id'];
          console.log('resposnse from post to api: ', res, ' roomID: ', roomID);
          this.setState({ loggedIn: true, username: username, roomID: roomID, isHost: true });

        })
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
              handleLoginSubmit={this.handleLoginSubmit}
              handleCreateGame={this.handleCreateGame}
              usernameChangeHandler={this.usernameChangeHandler}
              roomChangeHandler={this.roomChangeHandler}
            />
        }
      </div>
    );
  }

}
