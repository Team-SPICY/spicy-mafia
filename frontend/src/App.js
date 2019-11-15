import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Image from 'react-bootstrap/Image';

class App extends Component{

  render() {
    return (

      <div className="App">
        
          <img className= "cardimg" src = "/images/card.png"/>

        <div>
          <button className = "buttontest">INSTRUCTIONS</button>
          <button className = "buttontest2">PLAYER LIST</button>
        </div>


      </div>
    );
  }
}
export default App;
