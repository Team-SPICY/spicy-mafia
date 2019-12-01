import React, { Component } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap'
import {UserDayComponent} from './UserDayComponent';
import Game from "../Game/Game";
import {DayVote} from '../Vote/DayVote';
import './NewsFlash.css';


class NewsFlash extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const mafiaString     = JSON.stringify(this.props.mafia_killed);
        const nurseString     =  JSON.stringify(this.props.Nurse);
        return (

            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body bsPrefix={"News"}>
                    <div>
                        <h1 className={"title"}>RECAP FROM LAST NIGHT...</h1>
                        <h3 className={"title"}>Sheriff Investigation</h3>
                        {

                            this.props.sheriff ?
                                <h6 className={"result"}>Succesful</h6>
                                :
                                <p className={"result"} >Sheriff failed :( </p>
                        }
                        {
                            this.props.nurse ?
                                <p>
                                    <h3 className={"title"}>Nurse Saved:</h3>
                                    <h6 className={"result"}>{this.props.nurse}</h6>
                                </p>

                                :
                                <p>
                                    <h3 className={"title"}> Mafia Killed</h3>
                                    <h6 className={"result"} >{this.props.mafia}</h6>
                                </p>
                        }

                        }
                    </div>
                </Modal.Body>
                <Modal.Footer bsPrefix = {"News"}>
                    <Button variant={'outline-dark'} onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default NewsFlash;