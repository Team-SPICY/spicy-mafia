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
          className={user === currentUser ? "me" : 'other'}> <p><Badge pill variant="light">{i+1}</Badge> {user}</p>
            </ListGroup.Item>);
    }


    render() {
        return (

            <div>
              <div clasName="lobbyLogoContainer">
                <Image className="lobbyLogo" src ="/images/LobbyTitle.png"/>
              </div>

              <div className="listContainer">
                <ListGroup bsPrefix="yes" variant="flush">{
                  this.renderUsers()
                }</ListGroup>

              </div>
              <p>this.props.map(i)</p>
            </div>
        );
    }

}

export default Lobby;
