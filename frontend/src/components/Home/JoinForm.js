import React, { Component } from 'react';
import './HomeScreen.css';
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
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Enter the Secret Phrase
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        onChange={this.roomChangeHandler}
                        placeholder="Enter Room PIN"
                        minLength="4"
                        maxLength="4"
                        required />
                </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button size="sm" variant="light" className="submit" type="submit" value="Submit">
                            CANCEL
                            </Button>
                        <Button onClick={(e) => this.props.onSubmit(this.state.username, this.state.roomID, e)} size="sm" variant="light" className="submit" type="submit" value="Submit">
                            CONFIRM
                        </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>

        );
    }