import React, { Component } from 'react';
import './Lobby.css';



export default class LobbyFrom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    usernameChangeHandler = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    roomChangeHandler = (event) => {
        this.setState({
            roomID: event.target.value
        })
    }



    render() {

        return (
            <div className="login">

                < form onSubmit={() => this.props.onSubmit(this.state.username, this.state.roomID)
                } className="form" >
                    <input
                        type="text"
                        onChange={this.usernameChangeHandler}
                        placeholder="Enter your Username"
                        maxLength="10"
                        required />
                    <input
                        type="text"
                        onChange={this.roomChangeHandler}
                        placeholder="Enter Room PIN"
                        minLength="4"
                        maxLength="4"
                        required />
                    <button className="submit" type="submit" value="Submit">
                        Let's Play
                            </button>
                </form>
            </div >
        );
    }
}