import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image,Label, Button } from 'semantic-ui-react';
import { removeFollowing } from '../store';

export class Following extends Component {
  constructor(props) {
    super(props);
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  handleUnfollow(evt, userId, followingId) {
    evt.preventDefault();
    this.props.unfollow(userId, followingId);
  }

  render() {
    const user = this.props.singleUser;
    const host = this.props.host;
    return (
      <div>
        <Label id="friends-label">
          <img id="search-result-img" src={user.profilePicture} />
          {`   ${user.firstName} ${user.lastName}`} <br/>
          {`${user.email}`}
        </Label>

        <Button
          basic
          size="small"
          color="red"
          onClick={evt => this.handleUnfollow(evt, host.id, user.id)}
        >
          Unfollow
        </Button>
      </div>
    );
  }
}
const mapState = state => ({
  host: state.host
});

const mapDispatch = dispatch => ({
  unfollow(evt, followingId) {
    dispatch(removeFollowing(evt, followingId));
  }
});

export default connect(mapState, mapDispatch)(Following);
