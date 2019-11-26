import React, { Component } from 'react';
import { Modal, Button, ListGroup, Image, Badge } from 'react-bootstrap'
import './Lobby.css';
class Lobby extends Component {
    constructor(props) {
        super(props);

    }
    renderUsers = () => {
        const currentUser = this.props.currentUser;
        console.log(currentUser, this.props.users);
        return this.props.users.map((user, i) => <ListGroup.Item key={user}
          className={user === currentUser ? "me" : 'other'}> <p> {user}</p>
            </ListGroup.Item>);
    }


    render() {

        return (

            <div>
              <div clasName="lobbyLogoContainer">
                <Image className="lobbyLogo" src ="/images/LobbyTitle.png"/>
              </div>

              <div className="listContainer">
                <ListGroup bsPrefix="listPlayersContainer" variant="flush">{
                  this.renderUsers()
                }</ListGroup>
              </div>

              <div className="numPlayersContainer">
                <p>{this.props.users.length} SUSPECT(S)</p>
              </div>
            </div>
        );
    }

}

export default Lobby;
