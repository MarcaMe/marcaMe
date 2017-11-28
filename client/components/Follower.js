import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import { UserCard } from '../components';

export class Follower extends Component {
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
      return colors[index % this.props.follower.length];
    }

    render() {
      const follower = this.props.follower
      if (follower.length){
      return (
          <div>
          <Card.Group itemsPerRow={this.state.itemsPerRow}>
          {follower.map((user, index) => {
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
                    <UserCard singleUser={user.user} />
                    </Card>
                  </NavLink>
                );
              })}
        </Card.Group>
          </div>
      )}
      else {return <div />}
  }
}

const mapState = state => ({
    follower: state.follower
})

export default withRouter(connect(mapState)(Follower));
