import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label, Image } from 'semantic-ui-react';
import { ShareAContentThunk } from '../store';

class DisplayFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getFriendsIdArr: [],
      friendsInfoArr: []
    };
    this.findFriendInfo = this.findFriendInfo.bind(this);
    this.handleShare = this.handleShare.bind(this);
  }

  componentWillMount() {
    this.props.friendsArr.map(guy =>
      this.state.getFriendsIdArr.push(guy.userId)
    );
  }

  handleShare(evt, friendId) {
    evt.preventDefault();
    const storyId = this.props.storyId;
    const userId = this.props.user.id;
    this.props.shareThunk(storyId, userId, friendId);
    setTimeout(() => this.setState({ displayFriends: false }), 500);
  }

  render() {
    const findFriendInfo = (idArr, followArr) => {
      let rtnArr = [];
      followArr.map(guy => (idArr.includes(guy.id) ? rtnArr.push(guy) : null));
      return rtnArr;
    };
    const result = findFriendInfo(
      this.state.getFriendsIdArr,
      this.props.following
    );
    return (
      <div>
        {result.map(friend => {
          return (
            <Label
              key={friend.id}
              onClick={evt => this.handleShare(evt, friend.id)}
            >
              <Image avatar spaced="right" src={friend.profilePicture} />
              {friend.firstName}
            </Label>
          );
        })}
      </div>
    );
  }
}

const mapState = state => ({
  following: state.following,
  user: state.user
});

const mapDispatch = dispatch => {
  return {
    shareThunk(storyId, userId, friendId) {
      dispatch(ShareAContentThunk(storyId, userId, friendId));
    }
  };
};

export default connect(mapState, mapDispatch)(DisplayFriends);
