import React, { Component } from 'react';
import { Modal, Button, ListGroup, Row, Col, Tab, TabContainer, TabConent, TabPane, NavItem, Nav } from 'react-bootstrap'
//import './Player_list.css';
import './Instructions.css'

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
                <Modal.Header bsPrefix="instructionsHeader" closeButton>
                    <Modal.Title bsPrefix="instructionsTitle" id="contained-modal-title-vcenter">
                        INSTRUCTIONS
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body bsPrefix="instructionsBody">
                    <div className={"container"}>
                        <div>
                            <Tab.Container className="instructionsTabContainer" id="left-tabs-example" defaultActiveKey="General">
                              <Row>
                                <Col className="Col1" sm={3}>
                                  <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                      <Nav.Link className="instructionsNavItem" eventKey="General">General</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                      <Nav.Link className="instructionsNavItem" eventKey="Narrator">Narrator</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                      <Nav.Link className="instructionsNavItem" eventKey="Mafia">Mafia</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                      <Nav.Link className="instructionsNavItem" eventKey="Nurse">Nurse</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                      <Nav.Link className="instructionsNavItem" eventKey="Sheriff">Sheriff</Nav.Link>
                                    </Nav.Item>
                                  </Nav>
                                </Col>
                                <Col className="Col2" sm={9}>
                                  <Tab.Content>
                                    <Tab.Pane className="instructionsPane" eventKey="General">
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
                                    </Tab.Pane>
                                    <Tab.Pane className="instructionsPane" eventKey="Narrator">
                                      <li>You hold the maximum power.</li>
                                      <li>Once every player is inside the lobby, press the "Start" button.</li>
                                      <li>Once everyone’s vote is placed, and the “News Flash” is displayed, be creative and start the narrative.</li>
                                      <li>During discussion time, you must put someone on trial based on the players’ discussion by selecting
                                      a player and must continue to do so until someone dies.</li>
                                    </Tab.Pane>
                                    <Tab.Pane className="instructionsPane" eventKey="Mafia">
                                      <li>You must keep your role secret.</li>
                                      <li>You must kill a civilian during the Night-Time cycle by selecting the player you want to kill. The
                                      player with the most votes from Mafia members will die.</li>
                                    </Tab.Pane>
                                    <Tab.Pane className="instructionsPane" eventKey="Nurse">
                                      <li>You must try to save someone during the Night-Time cycle by selecting the player you want to save.</li>
                                    </Tab.Pane>
                                    <Tab.Pane className="instructionsPane" eventKey="Sheriff">
                                      <li>You must investigate someone during the Night-Time cycle by selecting the player you want to investigate.</li>
                                    </Tab.Pane>
                                  </Tab.Content>
                                </Col>
                              </Row>
                            </Tab.Container>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer bsPrefix="instructionsFooter">
                    <Button variant={'outline-dark'} onClick={this.props.onHide}>CLOSE</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default Instructions;
