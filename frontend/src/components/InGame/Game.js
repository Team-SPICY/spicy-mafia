import React, {Component} from 'react';
import Image from "react-bootstrap/Image";
import "./Game.css";
import {Button} from "react-bootstrap";
import Player_List from "../Players/Player_list";
import FlipCard from 'react-flipcard';

export class Game extends Component{
    constructor(props){
        super(props);
        this.state = {playersShow : false,
                      isDaytime   : false};

    }

    render(){
        return (
            <div className="Nightime">

                <FlipCard >
                    <div className={"card_container"}>
                        <Image src="/images/card.png" width={" "} height = {"600"} className={"img"}/>
                    </div>
                    <div >
                        <Image src="/images/card.png" width={" "} height = {"600"}  />
                    </div>

                </FlipCard>
                <div >
                    <button variant={"secondary"} type={"button"} className = "i_button">INSTRUCTIONS</button>
                    <button className = "p_button"
                            onClick={()=> this.setState({playersShow:true})}>PLAYER LIST</button>
                    <Player_List
                        show = {this.state.playersShow}
                        onHide = {() => this.setState({playersShow:false})}
                        />
                </div>
            </div>
        );

    }
}

