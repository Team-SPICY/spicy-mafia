import React, {Component} from 'react';
import Image from "react-bootstrap/Image";
import "./Game.css";
import Player_List from "../Players/Player_list";
import FlipCard from 'react-flipcard';

export class Game extends Component{
    constructor(props){
        super(props);
        this.state = {playersShow : false};
    }

    render(){
        return (
            <div className="Nightime">

                <FlipCard >
                    <div >
                        <Image src="/images/card.png" width={" "} height = {"600"} />
                    </div>
                    <div >
                        <Image src="/images/card.png" width={" "} height = {"600"}  />
                    </div>

                </FlipCard>
                <div >
                    <button className = "i_button">INSTRUCTIONS</button>
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
