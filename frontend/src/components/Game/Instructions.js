import React, { Component } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap'
//import './Player_list.css';

class Instructions extends Component {
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
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Instructions
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"container"}>
                        <div>
                            <p>
                              <ul>
                                <h3>General</h3>
                                <li>There are Mafia Members and Civilians. Only one group can survive.</li>
                                <li>Civilians win when Mafia is completely eliminated.</li>
                                <li>Mafia wins when they become the majority or are equal in number to the Civilians.</li>
                                <li>During the Night-Time cycle, everyone must put their votes in.</li>
                                <li>The Nurse, who is part of the Civilians, must attempt to save someone.
                                If the Nurse selects a player who the Mafia is trying to kill, the player survives</li>
                                <li>Mafia must attempt to kill someone. If the Nurse doesn't select the player who
                                the Mafia is trying to kill, the player dies.</li>
                                <li>The Sherrif, who is part of the Civilians, must investigate someone. The Sherriff
                                will know whether or not the investigated player is Mafia.</li>
                                <li>During the Day-Time cycle, everyone will discuss and put someone on trial,
                                if that individual is voted guilty, then that player will die.</li>
                                <li>Someone must die during the Day-Time cycle.</li>
                                <li>20% of the players will be Mafia.</li>
                                <li>There will only be one Nurse and one Sheriff.</li>
                                <li>Everyone else will be a Civilian.</li>
                                <br/>
                                <h3>Narrator</h3>
                                <li>You hold the maximum power.</li>
                                <li>Once every player is inside the lobby, press the "Start" button.</li>
                                <li>Once everyone’s vote is placed, and the “News Flash” is displayed, be creative and start the narrative.</li>
                                <li>During discussion time, you must put someone on trial based on the players’ discussion by selecting
                                a player and must continue to do so until someone dies.</li>
                                <br/>
                                <h3>Mafia</h3>
                                <li>You must keep your role secret.</li>
                                <li>You must kill a civilian during the Night-Time cycle by selecting the player you want to kill. The
                                player with the most votes from Mafia members will die.</li>
                                <br/>
                                <h3>Nurse</h3>
                                <li>You must try to save someone during the Night-Time cycle by selecting the player you want to save.</li>
                                <br/>
                                <h3>Sherriff</h3>
                                <li>You must investigate someone during the Night-Time cycle by selecting the player you want to investigate.</li>
                              </ul>
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
