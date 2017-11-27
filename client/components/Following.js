import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, Image, Icon, Divider } from "semantic-ui-react";
import { NavLink } from 'react-router-dom';
import { UserCard } from '../components';



export class Following extends Component {
  constructor(){
      super();
      this.state = {
        itemsPerRow: '4',
      };
      this._getColor = this._getColor.bind(this);
  }
  _getColor(index) {
    const colors = [
      'green',
      'teal',
      'blue',
      'green',
      'olive',
      'violet',
      'purple'
    ];
    return colors[index % this.props.following.length];
  }

  render() {
    const following = this.props.following
    if(following.length){
    return (
        <div>
        <Card.Group itemsPerRow={this.state.itemsPerRow}>
        {following.map((user, index) => {
              return (
                <NavLink key={user.id} to={`/profile/${user.id}`}>
                  <Card
                    style={{
                      width: '300px',
                      height: '350px',
                      margin: '0.5vw'
                    }}
                    color={this._getColor(index)}
                    className="card"
                    fluid
                  >
                  <UserCard singleUser={user}/>
                  </Card>
                </NavLink>
              );
            })}
      </Card.Group>
        </div>
    )}
    else {return <div/>}
}
}

const mapState = state => ({
    following: state.following
})

export default withRouter(connect(mapState)(Following));
