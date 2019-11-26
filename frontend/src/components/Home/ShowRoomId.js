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

                <Modal.Body bsPrefix="roomIDBody">
                    <h1 className="labelModal">SECRET PHRASE</h1>
                    <input className="roomIdInput"
                        type="text"
                        onChange={this.props.roomChangeHandler}
                        placeholder="What's the password?"
                        minLength="4"
                        maxLength="4"
                        required
                        autofocus="true"
                        />
                </Modal.Body>
                <Modal.Footer bsPrefix="roomIDFooter">
                    <ButtonGroup bsPrefix="roomIdBG">
                        <Button onClick={() => this.props.onHide()} className="cancel" size="sm" variant="light"  type="submit" value="Submit">
                            CANCEL
                        </Button>
                        <Button onClick={(e) => this.props.handleLoginSubmit(e)} className="Confirm" size="sm" variant="light"  type="submit" value="Submit">
                            CONFIRM
                        </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ShowRoomId;
