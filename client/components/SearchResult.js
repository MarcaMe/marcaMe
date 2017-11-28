import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addOneFollowing } from '../store';
import { List, Button, Image } from 'semantic-ui-react';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      follow: 'Follow'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkFollowing = this.checkFollowing.bind(this);
  }
  checkFollowing(followingId){
    return this.props.following.some(guy => guy.id === followingId)
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const followingId = this.props.searchFriends[0].id;
    const userId = this.props.user.id;
    if (this.checkFollowing(followingId) ) { this.setState({follow: 'Already Followed!' }) }
    else {this.props.followAFriend(followingId, userId)
      this.setState({ follow: 'Followed!' })}

  }

  render() {
    return this.props.render ? (
      <div>
        <List horizontal>
          <List.Item>
            <Image avatar src={this.props.searchFriends[0].profilePicture} />
            <List.Content>
              <List.Header>{this.props.searchFriends[0].firstName}</List.Header>
              {this.props.searchFriends[0].email}
            </List.Content>
          </List.Item>
          <List.Item>
            <Button type="button" size="mini" onClick={this.handleSubmit}>
              {this.state.follow}
            </Button>
          </List.Item>
        </List>
      </div>
    ) : (
      <div />
    );
  }
}

const mapState = state => ({
  searchFriends: state.searchFriends,
  user: state.user,
  following: state.following
});

const mapDispatch = dispatch => {
  return {
    followAFriend(followingId, userId) {
      dispatch(addOneFollowing(followingId, userId));
    }
  };
};

export default connect(mapState, mapDispatch)(SearchResult);
