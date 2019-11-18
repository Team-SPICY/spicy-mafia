import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap'
import "./Player_list.css";

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
                <Modal.Header closeButton className = "style">
                    <Modal.Title id="contained-modal-title-vcenter" className = "style">
                        Players Alive
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className = "style">
                    <div className={"container"} >
                        LIST OF PLAYERS
                    </div>
                </Modal.Body>
                <Modal.Footer className = "style">
                    <Button variant = {'outline-dark'} onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default Player_List;