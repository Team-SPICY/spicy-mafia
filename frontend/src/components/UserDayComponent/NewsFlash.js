import React, { Component } from 'react';
import { Modal, Button, Figure, Image} from 'react-bootstrap'
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
                        <div className={"head_cont"}>
                            <header className={"title"}>THE DARK NEWS</header>
                        </div>
                        <div className={"sub_title"}>
                            This City, This Day, 1960
                        </div>
                        <p> {this.props.quizQuestion}</p>
                        <p>{this.props.winner}</p>
                        <p className="title">Sheriff Investigation</p>
                        <Figure>
                            <Image src={"/images/SheriffCard.png"} thumbnail={true} />
                        </Figure>
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
                <Modal.Footer bsPrefix={"footer"}>
                    <Button variant={'outline-light'} onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default NewsFlash;