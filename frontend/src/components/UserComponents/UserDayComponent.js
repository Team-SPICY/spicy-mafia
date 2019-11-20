import React, { Component } from 'react';
import axios from 'axios'
import Flipcard from '@kennethormandy/react-flipcard'
import '@kennethormandy/react-flipcard/dist/Flipcard.css'

import Image from "react-bootstrap/Image";
import WebSocketInstance from '../../services/WebSocket'

export default class UserDayComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }
    render() {
        return (
            <div>
                Day card
            </div>
        );
    }
}
