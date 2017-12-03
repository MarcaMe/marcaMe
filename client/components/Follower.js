import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Card, Label } from 'semantic-ui-react';
import { UserCard } from '../components';
import { fetchFollower } from '../store';

export class Follower extends Component {
  constructor() {
    super();
    this.state = {
      itemsPerRow: '4'
    };
    this._getColor = this._getColor.bind(this);
  }
  componentDidMount() {
    this.props.getFollowers();
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
    const follower = this.props.follower;
    return (
      follower && (
        <div id="friends-list">
          <h2>Followers</h2>
          {follower.map((user, index) => {
            return (
              <NavLink key={user.id} to={`/profile/${user.userId}`}>
                <Label id="friends-label">
                  <img id="search-result-img" src={user.user.profilePicture} />
                  {`   ${user.user.firstName} ${user.user.lastName}`} <br />
                  {`${user.user.email}`}
                </Label>
              </NavLink>
            );
          })}
        </div>
      )
    );
  }
}

const mapState = state => ({
  follower: state.follower
});

const mapDispatch = (dispatch, ownProps) => ({
  getFollowers() {
    const id = ownProps.match.params.id;
    dispatch(fetchFollower(id));
  }
});
export default withRouter(connect(mapState, mapDispatch)(Follower));
