import React, { Component } from 'react';
import Flipcard from '@kennethormandy/react-flipcard'

import '@kennethormandy/react-flipcard/dist/Flipcard.css'


export class DayVote extends Component {
    constructor(props) {
        super(props);
    }

    // recieve vote and reflect that vote

    render() {
        return (
            //flip card one side shows yes/no button, other side shows who voted yes who voted no
            <Flipcard >
                <div >
                    <Image src="/images/card.png" width={" "} height={"600"} />
                </div>
                <div >
                    <Image src="/images/card.png" width={" "} height={"600"} />
                </div>

            </Flipcard>
        )
    }

}