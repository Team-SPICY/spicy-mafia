import React, {Component} from 'react';
import './App.css';
<<<<<<< HEAD
import Home from './components/Home/HomeScreen.js'
class App extends Component{

  render() {
    return (

      <div className="App">

          <Home></Home>

      </div>
    );
  }
=======
import {Game} from './components/Game';
import {Home} from "./components/Home/HomeScreen";

class App extends Component {
    render() {
            return (
                <Game />

            );
        }
>>>>>>> 912b8425c4c4ee6dca7cf7d9b9f94ee11b9dcb12
}

export default App;
