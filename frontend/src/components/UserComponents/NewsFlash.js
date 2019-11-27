import React, { Component } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap'
import UserDayComponent from "./UserDayComponent";
import Game from "../Game/Game";


class NewsFlash extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        THIS HAPPENED
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {
                            this.props.mafia_kill ?
                                {this.props.mafia_kill}
                                :
                                {this.props.nurse_saved}
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'outline-dark'} onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default NewsFlash;