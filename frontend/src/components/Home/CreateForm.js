import React, { Component } from 'react';
import './Homepage.css';
import { Button, ButtonGroup, Form, } from 'react-bootstrap'


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
                < Form onSubmit={(e) => this.props.onSubmit(this.state.username, this.state.roomID, e)
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
                    <ButtonGroup className='buttons' >
                        <Button size="sm" variant="light" className="submit" type="submit" value="Submit">
                            Join A Game
                            </Button>
                        <Button size="sm" variant="light" onClick={(e) => this.props.createGameSubmit(e, this.state.username)} >Create a Game</Button>
                    </ButtonGroup>

                </Form>

            </div >
        );
    }
}