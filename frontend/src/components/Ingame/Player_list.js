import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap'

class Player_List extends Component{
    constructor(props) {
        super(props);

    }
    render() {
        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Players Alive
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"container"}>
                        LIST OF PLAYERS
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant = {'outline-dark'} onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default Player_List;