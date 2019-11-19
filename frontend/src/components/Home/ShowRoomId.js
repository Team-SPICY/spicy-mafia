import React, { Component } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { FormControl } from 'react-bootstrap';

export class ShowRoomId extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="login">
                <Form>
                    <Form.Group onSubmit={(e) => this.props.onSubmit(this.props.username, this.props.roomID, e)} className="roomCode" >
                        <Form.Label>Room Code</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="Enter the phrase" />
                        <Form.Text className="text-muted">
                            Enter A Room
                        </Form.Text>
                    </Form.Group>
                    <ButtonGroup>
                        <Button onClick={this.props.onHide} size="sm" variant="light" className="close">
                            CANCEL
                            </Button>
                        <Button onClick={(e) => this.props.onSubmit(this.props.username, this.props.roomID, e)} size="sm" variant="light" className="submit">
                            CONFIRM
                            </Button>
                    </ButtonGroup>
                </Form>
            </div >
        );
    }
}

export default ShowRoomId;