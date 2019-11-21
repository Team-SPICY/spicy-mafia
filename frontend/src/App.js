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
      //hit lobby api to get what rooms are there
      axios.get('http://127.0.0.1:8000/api/lobby/')
        .then(res => {
          const rooms = res['data'];
          console.log('rooms: ', rooms);
          if (roomID in rooms && rooms[roomID]['isActive'] === false) { //if room user provided is true then try to enter room
            axios.put(`http://127.0.0.1:8000/api/lobby/${roomID}/`, { 'user': username })
              .then(res2 => {
                console.log('responce from joining, is valid username?', res2)
                if (res2['data']['is_valid_user'] === true) {
                  //room is valid to join so update the state
                  this.setState({ loggedIn: true, username: username, roomID: roomID, isHost: false });

                  //connect to websockets, new websocket based on the roomID
                  WebSocketInstance.connect(username, roomID);
                }
                else {
                  alert(`Username ${username} taken already!`);
                }
              })
          }
          else {
            alert('room does not exist or is in play already!');
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
          roomID = res['data']['lobby_id'];
          console.log('resposnse from post to api: ', res, ' roomID: ', roomID);
          this.setState({ loggedIn: true, username: username, roomID: roomID, isHost: true });
          WebSocketInstance.connect(username, roomID);
        })

    }
  }

  render() {
    const {
      loggedIn,
      username,
      roomID,
      isHost,
    } = this.state;

    return (
      <div className="App">
        {
          loggedIn ?
            <Game
              currentUser={username}
              roomID={roomID}
              isHost={isHost}
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
