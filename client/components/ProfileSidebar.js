import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Icon, Divider } from 'semantic-ui-react';

export class ProfileSidebar extends Component {
  render() {
    const user = this.props.user;
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
              <h5 className="follow-text">Followers</h5>
              </div>
              <div className="follow-icon-container">
              <Icon size="large" name="user circle outline" />
              <h5 className="follow-text">Following</h5>
              </div>
            </div>
            <Divider />
            <h3>Collections</h3>
          </div>
        </div>
    );
  }
}

const mapState = state => ({
  user: state.user
});

export default connect(mapState)(ProfileSidebar);
