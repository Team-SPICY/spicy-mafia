import React, { Component } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from 'react-bootstrap';
import './ShowRoomId.css';

export class ShowRoomId extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title>
                        SECRET PHRASE
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        onChange={this.props.roomChangeHandler}
                        placeholder="What's the password?"
                        minLength="4"
                        maxLength="4"
                        required
                        />
                </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button onClick={() => this.props.onHide()} size="sm" variant="light" className="submit" type="submit" value="Submit">
                            CANCEL
                        </Button>
                        <Button onClick={(e) => this.props.handleLoginSubmit(e)} size="sm" variant="light" className="submit" type="submit" value="Submit">
                            CONFIRM
                    </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ShowRoomId;
