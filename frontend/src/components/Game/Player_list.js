import React, { Component } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap'

class Player_List extends Component {
    constructor(props) {
        super(props);

    }
    renderUsers = () => {
        const currentUser = this.props.currentUser;
        console.log(currentUser, this.props.users);
        return this.props.users.map((user, i) => <ListGroup.Item key={user} className={user === currentUser ? "me" : 'other'}> <p>{user}</p></ListGroup.Item>);
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
                        Players Alive
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"container"}>
                        LIST OF PLAYERS
                        <div>
                            <ListGroup>{
                                this.renderUsers()
                            }</ListGroup>
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

export default Player_List;