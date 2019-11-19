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

    render() {

        return (
            <div className="login">
                < Form onSubmit={(e) => this.props.onSubmit(this.state.username, this.state.roomID, e)
                } className="roomCode" >
                    <h2>ROOM CODE</h2>
                    <input
                        type="text"
                        onChange={this.roomChangeHandler}
                        placeholder="Enter Room PIN"
                        minLength="4"
                        maxLength="4"
                        required />
                    <ButtonGroup><Button size="sm" variant="light" className="submit" type="submit" value="Submit">
                        CANCEL
                            </Button>
                        <Button size="sm" variant="light" className="submit" type="submit" value="Submit">
                            CONFIRM
                            </Button>
                    </ButtonGroup>

                </Form>

            </div >
        );
    }
}