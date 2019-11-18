import React, {Component} from 'react';
import Image from "react-bootstrap/Image";
import Player_List from "./Player_list";

export class Game extends Component{
    constructor(props){
        super(props);
        this.state = {playersShow : false};
    }

    render(){
        return (
            <div className="App">
                <Image src="/images/card.png" width={" "} height={"600"} />
                <div >
                    <button className="buttontest">INSTRUCTIONS</button>
                    <button className="buttontest2"
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
