import React, { Component } from 'react';
import './HomeScreen.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import ShowRoomId from './ShowRoomId'

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            roomIDShow: false,
        };
    }

    // render function for Home Screen
    render() {

        return (
            // Adds Home Screen Image 
            <div className="Homescreen">

                <div className="homeContainer">

                    <div className="homeLogoContainer">
                      <img className="homeLogo" src="/images/MafiaHomeLogo.png" />
                    </div>
            
                    // Allows users to type in their username
                    <label>USERNAME</label>
                    <div className= "inputContainer">
                      <div className="usernameInput">

                          <input type="text" name="name" type="text"
                                  onChange={this.props.usernameChangeHandler}
                                  placeholder="Who are you?"
                                  minLength="3"
                                  maxLength="10"
                              />
                      </div>
                    </div>

                  // Buttons to host or join game
                  <div className ="buttonContainer">
                    <Button onClick={() => this.props.handleCreateGame(this.props.username)} className="buttonHost">HOST</Button>
                    <Button onClick={() => this.setState({ roomIDShow: true })} className="buttonJoin">JOIN</Button>
                  </div>

                </div>
                
                // checks if room code exist and player can join
                {this.state.roomIDShow ?
                    <ShowRoomId
                        show={this.state.roomIDShow}
                        roomChangeHandler={this.props.roomChangeHandler}
                        handleLoginSubmit={this.props.handleLoginSubmit}
                        onHide={() => this.setState({ roomIDShow: false })}
                    /> : null
                }
            </div >
        );
    }
}

export default Home;
