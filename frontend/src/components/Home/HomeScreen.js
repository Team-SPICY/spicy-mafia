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
    render() {
        return (
            <div className="Homescreen">

                <div className="homeContainer">

                    <div className="homeLogoContainer">
                      <img className="homeLogo" src="/images/MafiaHomeLogo.png" />
                    </div>

                    <div className= "inputContainer">
                    <div>
                      <div className="usernameInput">
                          <label>USERNAME
                          <input type="text" name="name" type="text"
                                  onChange={this.props.usernameChangeHandler}
                                  placeholder="Who are you?"
                                  minLength="3"
                                  maxLength="10"
                              />
                          </label>
                      </div>
                    </div>
                    </div>


                <div className ="buttonContainer">
                  <Button onClick={() => this.props.handleCreateGame(this.props.username)} className="buttonHost">HOST</Button>
                  <Button onClick={() => this.setState({ roomIDShow: true })} className="buttonJoin">JOIN</Button>
                </div>

                </div>
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
