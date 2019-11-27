import React, { Component } from 'react';
import { Modal, Button, ListGroup, Image, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap'
import './Lobby.css';
import Instructions from '../Game/Instructions'
class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructionShow: false,
    }

  }
  renderUsers = () => {
    const currentUser = this.props.currentUser;
    console.log(currentUser, this.props.users);
    return this.props.users.map((user, i) => <ListGroup.Item key={user}
      className={user === currentUser ? "me" : 'other'}><p>{user}</p>
    </ListGroup.Item>);
  }

  renderUserLegnth() {
    console.log(this.props.users)
    return (this.props.users.length - 1);
  }
  renderTooltip() {
    return <Tooltip>Minnimum 4 players and 1 host: 5 total users</Tooltip>;
  }

  render() {

    return (

      <div>
        <div className="lobbyLogoContainer">
          <Image className="lobbyLogo" src="/images/LobbyTitle.png" />
        </div>
        <div className="secretCodeContainer">
          <p>SECRET CODE:</p>
          <h1>{this.props.roomID}</h1>
        </div>
        <div className="listContainer">
          <ListGroup bsPrefix="listPlayersContainer" variant="flush">
            {
              this.renderUsers()
            }
          </ListGroup>
        </div>
        {this.props.isHost === true ?
          <div className="Lobby">
            <Button onClick={() => this.setState({ instructionShow: true })} variant={"secondary"} type={"button"} className="instructionsButton">INSTRUCTIONS</Button>
            <Instructions
              show={this.state.instructionShow}
              onHide={() => this.setState({ instructionShow: false })}
            />
            {this.props.users.length > 4 ?
              <Button onClick={this.props.startGame} className="startButton">START</Button>
              :
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={this.renderTooltip()}
              >
                <Button className="startButton">START</Button>
              </OverlayTrigger>


            }

          </div>
          :
          <div className="Lobby">
            <Button onClick={() => this.setState({ instructionShow: true })} variant={"secondary"} type={"button"} className="instructionsButton">INSTRUCTIONS</Button>
            <Button disabled className="startButton">START</Button>
            <Instructions
              show={this.state.instructionShow}
              onHide={() => this.setState({ instructionShow: false })}
            />
          </div>}
      </div>

    );
  }

}

export default Lobby;
