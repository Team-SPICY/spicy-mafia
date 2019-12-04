import React, { Component } from 'react';
import {Modal, Button, Figure, Image, Row, Col, Container} from 'react-bootstrap'
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
                        <div className={"head_cont"}>
                            <header className={"title"}>THE DARK NEWS</header>
                        </div>
                        <div className={"date"}>
                            This City, This Day, 1934
                        </div>
                        <Container  >
                            <Row>
                                <Col bsPrefix={"column"}>
                                    <div>
                                      <header className={"sub_title"}> {this.props.quizQuestion}</header>
                                      <p className={"inside_text"}> Civilians have come to the agreement that
                                          <span className={"result"}> {this.props.winner} </span>
                                          is the choosen one.
                                      </p>
                                    </div>
                                    <div>
                                        <p className="sub_title">Sheriff Investigation</p>
                                        {
                                            this.props.sheriff === true ?
                                                <p className="result">Sheriff investigated... and found a mafia</p>
                                                :
                                                <p className={"inside_text"} >Sadly Sheriff is investigation has resulted
                                                    <span className={"result"}> unsuccessful</span>.
                                                    Investigation continues
                                                </p>
                                        }
                                    </div>
                                </Col>
                                <Col bsPrefix={"column"}>
                                    <p className={"sub_title"}> BREAKING </p>
                                    <div>
                                    {
                                        this.props.mafia_kill !== "" ?
                                            <div>
                                                <header className="sub_title"> Mafia has killed
                                                    <span className={"result"}> {this.props.mafia_kill} </span>
                                                </header>
                                                <p className="inside_text" >
                                                    Residents left shocked when
                                                    <Figure bsPrefix={"figure_img"}>
                                                        <Figure.Image
                                                            width ={171}
                                                            height={180}
                                                            src={"/images/MafiaCard.png"}
                                                            roundedCircle={true}
                                                        />
                                                    </Figure>
                                                    they learnt about the sudden death
                                                </p>
                                            </div>
                                            :
                                            null
                                    }
                                    </div>
                                    <div>
                                    {
                                        this.props.nurse_saved !== "" ?
                                            <div>
                                                <p className={"inside_text"}>Nurse saved a
                                                    <Figure bsPrefix={"figure_img"}>
                                                        <Figure.Image
                                                            width ={171}
                                                            height={180}
                                                            src={"/images/NurseCard.png"}
                                                            roundedCircle={true}
                                                        />
                                                    </Figure>
                                                    could have been victim...</p>

                                            </div>
                                            :
                                            null
                                    }
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                </Modal.Body>
                <Modal.Footer bsPrefix={"footer"}>
                    <Button variant={'outline-light'} onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default NewsFlash;