import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Icon, Divider, Button } from 'semantic-ui-react';
import {
  fetchFollowing,
  fetchFollower,
  updateOneHostName,
  addOneFollowing,
  removeFollowing
} from '../store';
import { withRouter, NavLink } from 'react-router-dom';
import { setTimeout } from 'timers';

export class ProfileSidebar extends Component {
  constructor() {
    super();
    this.state = {
      success: false
    };
  }
  componentDidMount() {
    const hostId = this.props.match.params.id;
    this.props.getFollower(hostId);
    this.props.getFollowing(hostId);
  }

  render() {
    const loggedInUser = this.props.user;
    const user = this.props.host;
    if (this.props.follower) {
      return (
        <div id="profile-sidebar">
          <div id="profile-info">
            <Image
              id="Image-profile-pic"
              src={user.profilePicture}
              size="medium"
              circular
            />
            <div id="name_follow">
              <h2>{`${user.firstName} ${user.lastName}`}</h2>
              {user.id !== loggedInUser.id && (
                <Button
                  disabled={this.state.success}
                  color="teal"
                  onClick={evt => {
                    this.props.followAFriend(evt, user.id, loggedInUser.id);
                    this.setState({ success: !this.state.success });
                  }}
                >
                  {this.state.success ? 'Followed!' : ' Follow'}
                </Button>
              )}
            </div>
            <div id="followers-container">
              <div className="follow-icon-container">
                <Icon size="large" name="user circle" />
                <NavLink to={`/profile/follower/${user.id}`}>
                  {' '}
                  <h5 className="follow-text">See Followers</h5>{' '}
                </NavLink>
              </div>
              <div className="follow-icon-container">
                <Icon size="large" name="user circle outline" />
                <NavLink to={`/profile/following/${user.id}`}>
                  {' '}
                  <h5 className="follow-text">See Following</h5>{' '}
                </NavLink>
              </div>
            </div>
            <Divider />
            <h3>Collections</h3>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapState = state => {
  return {
    user: state.user,
    content: state.content,
    follower: state.follower,
    following: state.following,
    alreadyFollowed: !!state.follower.find(
      aFollower => +aFollower.userId === +state.user.id
    )
  };
};

const mapDispatch = dispatch => ({
  getFollowing(id) {
    dispatch(fetchFollowing(id));
  },
  getFollower(id) {
    dispatch(fetchFollower(id));
  },
  updateHostName(id, name) {
    dispatch(updateOneHostName(id, name));
  },
  followAFriend(evt, followingId, userId) {
    evt.preventDefault();
    dispatch(addOneFollowing(followingId, userId));
  },
  unFollow(evt, userId, followingId) {
    evt.preventDefault();
    dispatch(removeFollowing(userId, followingId));
  }
});

export default withRouter(connect(mapState, mapDispatch)(ProfileSidebar));
