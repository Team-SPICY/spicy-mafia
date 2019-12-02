import React, { Component } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap'
import './NewsFlash.css';


class NewsFlash extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {

        };
    }

    render() {
        return (

            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body bsPrefix="News">
                    <div>
                        <h1 className="title">RECAP FROM LAST NIGHT...</h1>
                        <h3> {this.props.quizQuestion}</h3>
                        <p>{this.props.winner}</p>
                        <h3 className="title">Sheriff Investigation</h3>
                        {
                            this.props.sheriff === true ?
                                <h3 className="result">Sheriff Investigated... and found a mafia</h3>
                                :
                                <h3 className={"result"} >Sheriff failed :( </h3>
                        }
                        {
                            this.props.mafia_kill !== "" ?
                                <div>
                                    <h3 className="title"> Mafia Killed</h3>
                                    <h6 className="result" >{this.props.mafia_kill}</h6>
                                </div>
                                :
                                null
                        }
                        {
                            this.props.nurse_saved !== "" ?
                                <div>
                                    <h3 className={"title"}>Nurse saved a would be victim...</h3>
                                </div>
                                :
                                null
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer bsPrefix={"News"}>
                    <Button variant={'outline-dark'} onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default NewsFlash;