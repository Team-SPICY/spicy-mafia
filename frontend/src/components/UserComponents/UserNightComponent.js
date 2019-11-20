import React, { Component } from 'react';
import axios from 'axios'
import Flipcard from '@kennethormandy/react-flipcard'
import { Card, Button, ListGroup } from 'react-bootstrap'
import '@kennethormandy/react-flipcard/dist/Flipcard.css'

import Image from "react-bootstrap/Image";
import WebSocketInstance from '../../services/WebSocket'

export default class UserNightComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voted: false,
            flipped: false,
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
            <div className="Nightime">
                <Flipcard >
                    <div >
                        <Image src={this.state.backgroundSrc} width={" "} height={"600"} />
                        <h3>Description</h3>
                        <p>{this.state.description}</p>
                    </div>
                    <div >
                        <Image src={this.state.backgroundSrc} width={" "} height={"600"} />
                        {
                            //add some voting function here through importing Vote components
                        }
                    </div>
                </Flipcard>
            </div>
        );
    }
}
