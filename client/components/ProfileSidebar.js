import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, Icon, Divider } from "semantic-ui-react";
import { fetchFollowing, fetchFollower } from "../store";
import { withRouter } from "react-router-dom";
import { NavLink } from 'react-router-dom';


export class ProfileSidebar extends Component {
  componentWillMount() {
    const hostId = this.props.match.params.id;
    this.props.getFollower(hostId);
    this.props.getFollowing(hostId);
  }
  render() {
    const user = this.props.host;
    const follower = this.props.follower.length;
    const following = this.props.following.length;
   if(this.props.follower){
    return (
        <div id="profile-sidebar">
          <div id="profile-info">
            <Image
              id="Image-profile-pic"
              src={user.profilePicture}
              size="medium"
              circular
            />
            <h2>{`${user.firstName} ${user.lastName}`}</h2>
            <div id="followers-container">
              <div className="follow-icon-container">
              <Icon size="large" name="user circle" />
              <NavLink to={`/profile/follower/${user.id}`}> <h5 className="follow-text">Followers: { follower } </h5> </NavLink>
              </div>
              <div className="follow-icon-container">
              <Icon size="large" name="user circle outline" />
             <NavLink to={`/profile/following/${user.id}`}> <h5 className="follow-text">Following: { following } </h5> </NavLink>
              </div>
            </div>
            <Divider />
            <h3>Collections</h3>
          </div>
        </div>
    )
  } else {
    return <div /> 
  }
  }  
}

const mapState = state => ({
  user: state.user,
  content: state.content,
  host: state.host,
  follower: state.follower,
  following: state.following
});

const mapDispatch = dispatch => ({
  getFollowing(id) {
    dispatch(fetchFollowing(id));
  },
  getFollower(id) {
    dispatch(fetchFollower(id));
  }
});

export default withRouter(connect(mapState, mapDispatch)(ProfileSidebar));
