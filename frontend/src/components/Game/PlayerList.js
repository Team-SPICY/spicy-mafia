import React, { Component } from 'react';
import { Modal, Button, ListGroup, Badge } from 'react-bootstrap'
import './Player_list.css';
class PlayerList extends Component {
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
                <Modal.Header bsPrefix="playerListHeader">
                    <Modal.Title id="contained-modal-title-vcenter">
                        PLAYERS
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body bsPrefix="playerListBody">
                    <div className={"container"}>
                        <div className="playerListLG">
                            <ListGroup>{
                                this.renderUsers()
                            }</ListGroup>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer bsPrefix="playerListFooter">
                    <Button variant={'outline-dark'} onClick={this.props.onHide}>CLOSE</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default PlayerList;
