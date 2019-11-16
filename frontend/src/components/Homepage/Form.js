import React, { Component } from 'react';
import './Homepage.css';



export default class HomepageFrom extends Component {

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
                < form onSubmit={(e) => this.props.onSubmit(this.state.username, this.state.roomID, e)
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
                        Join A Game
                            </button>
                    <button onClick={(e) => this.props.createGameSubmit(e, this.state.username)} className="submit" type="submit" value="submit">Create a Game</button>
                </form>

            </div >
        );
    }
}