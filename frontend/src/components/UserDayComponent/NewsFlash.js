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
    showCurrentDate=()=>{

          var date = new Date().getDate();
          var month = new Date().getMonth() + 1;
          var year = new Date().getFullYear();
          var DateMonthYear = '';
          return DateMonthYear = month + '/' + date + '/' + year;

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
                        <header className={"title"}>THE SPICY TIMES  <Figure>
                            <Figure.Image
                                width ={60}
                                height={60}
                                src={"/images/SpicyTimesLogo.png"}
                            />
                        </Figure>
                        </header>
                    </div>
                    <div className={"date"}>
                        This City, This Day, {this.showCurrentDate()}
                    </div>
                    <Container  >
                        <Row>
                            <Col bsPrefix={"column"}>
                                <div>
                                    <header className={"sub_title"}> {this.props.quizQuestion}</header>
                                    <p className={"inside_text"}> The Civilians have come to the agreement that
                                        <span className={"result"}> {this.props.winner} </span>
                                        is the chosen one.
                                    </p>
                                </div>
                                <div>
                                    <header className="sub_title">Sheriff Investigation</header>
                                    {
                                        this.props.sheriff === true ?
                                            <p className="inside_text">Sheriff investigated... and <span className={"result"}>found a mafia.</span></p>
                                            :
                                            <p className={"inside_text"} >Sadly the Sheriff's investigation was
                                                <span className={"result"}> unsuccessful</span>.
                                                The investigation continues.
                                            </p>
                                    }
                                </div>
                            </Col>
                            <Col bsPrefix={"column_left"}>
                                <p className={"breaking_title"}> BREAKING NEWS </p>
                                <div>
                                    {
                                        this.props.mafia_kill !== "" ?
                                            <div>
                                                <header className="sub_title"> Mafia has killed
                                                    <span className={"result"}> {this.props.mafia_kill} </span>
                                                </header>
                                                <p className="inside_text" >
                                                    Residents are left shocked when they learned about the sudden death. Authorities have arrived on the scene. Truly a dark day
                                                    <Figure bsPrefix={"figure_img"}>
                                                        <Figure.Image
                                                            width ={171}
                                                            height={180}
                                                            src={"/images/NewsflashMafia.png"}
                                                        />
                                                    </Figure>here in Spiceville.
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
                                                <header className="sub_title">Attempted Murder</header>
                                                <p className={"inside_text"}>Last night, an unfortunate event occurred. However, the Nurse arrived quickly on the scene and was able to <span className={"result"}>save</span> the
                                                    <Figure bsPrefix={"figure_img"}>
                                                        <Figure.Image
                                                            width ={171}
                                                            height={180}
                                                            src={"/images/NewsflashNurse.png"}
                                                        />
                                                    </Figure> victim involved...
                                                  </p>

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
