import React, { Component } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap'
//import './Player_list.css';

class Instructions extends Component {
    constructor(props) {
        super(props);
    }

    renderInstructions = () => {
        var instructions = "Hello, Welcome to a Spicy a Mafia!"
        console.log(instructions);
        return instructions;
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Instructions
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"container"}>
                        Instructions
                        <div>
                            <p>
                              {this.renderInstructions()}
                            </p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'outline-dark'} onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default Instructions;
