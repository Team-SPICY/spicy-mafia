import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home/HomeScreen.js'
class App extends Component{

  render() {
    return (

      <div className="App">

          <Home></Home>

      </div>
    );
  }
}
export default App;
