import React, {Component} from 'react';
import './HomeScreen.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

export class Home extends Component{

  render() {
    return (

      <div className="App">
        <img className = "homeLogo" src = "/images/MafiaHomeLogo.png"/>
        <ButtonGroup className = "buttonGroupJH" vertical>
            <Button className = "buttonHost">HOST</Button>
            <Button className = "buttonJoin">JOIN</Button>
        </ButtonGroup>
      </div>
    );
  }
}
export default Home;
