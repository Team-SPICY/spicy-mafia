import React, { Component } from 'react';
import axios from 'axios'
import FlipCard from 'react-flipcard';
import {Card, Button, ListGroup, Container} from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';


import Image from "react-bootstrap/Image";
import WebSocketInstance from '../../services/WebSocket'

export default class UserNightComponent extends Component {
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleOnFlip  = this.handleOnFlip.bind(this);
        this.showFront     = this.showFront.bind(this);
        this.showBack      = this.showBack.bind(this);
        this.backButton    = React.createRef();
        this.state = {
            voted: false,
            isFlipped: false,
            backgroundSrc: '',
            description: '',
            NurseDescription: 'You Are A Nurse',
            SheriffDescription: 'You Are A Sheriff',
            CivilianDescription: 'You Are A Civilian',
            MafiaDescription: 'You Are A Mafioso',
        };
    }
    componentDidMount() {
        this.setBackground();
    }

    showBack() {
        this.setState({isFlipped : true});
    }

    showFront() {
        this.setState( {isFlipped : false});
    }


    handleOnFlip(flipped) {
        if (flipped) {
            this.backButton.current.focus();
        }
    }

    handleKeyDown(e) {
        if (this.state.isFlipped && e.keyCode === 27) {
            this.showFront();
        }
    }

    //render function for nurse
    setBackground() {
        console.log('setting role: ', this.props.role)
        const role = this.props.role;
        if (role === 'Civilian') {
            this.setState({ backgroundSrc: "/images/CivilianCard.png", description: this.state.CivilianDescription });
        }
        else if (role === 'Sheriff') {
            this.setState({ backgroundSrc: "/images/SheriffCard.png", description: this.state.SheriffDescription });
        }
        else if (role === 'Nurse') {
            this.setState({ backgroundSrc: "/images/NurseCard.png", description: this.state.NurseDescription });

        }
        else {
            this.setState({ backgroundSrc: "/images/card.png", description: this.state.MafiaDescription });
        }
        console.log('setting role: ', role, this.state.description)

    }


    render() {
        return (
                <Container fluid={true}>
                    <Row>
                        <Col xs = {6} md = {7}>
                <FlipCard
                    disabled = {true}
                    flipped = {this.state.isFlipped}
                    onFlip  = {this.handleOnFlip}
                    onKeyDown = {this.handleKeyDown}
                    >
                    <div onClick={this.showBack} >
                        <img src ={this.state.backgroundSrc} width={" "} height={"600"}/>
                    </div>
                    <div ref={this.backButton} onClick={this.showFront} >
                        <img src ={this.state.backgroundSrc} width={" "} height={"600"}  />
                    </div>
                </FlipCard>
                        </Col>
                    </Row>
                </Container>
        );
    }
}
