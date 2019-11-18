import React, {Component} from 'react';
import './HomeScreen.css';


export class Home extends Component{

  render() {
    return (

      <div className="App">
        <img className = "homeLogo" src = "/images/MafiaHomeLogo.png"/>


            <button className = "buttonHost">HOST</button>
            <button className = "buttonJoin">JOIN</button>
              <form>
    <label>
      Username
      <input type="text" name="name" />
    </label>
  </form>




      </div>
    );
  }
}
export default Home;
