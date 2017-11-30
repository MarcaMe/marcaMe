import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Icon, Divider } from 'semantic-ui-react';
import { fetchFollowing, fetchFollower, updateOneHostName } from '../store';
import { withRouter, NavLink } from 'react-router-dom';
import { setTimeout } from 'timers';

export class ProfileSidebar extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEditName: false,
      changeName: '',
    }
    this._showChangeNameField = this._showChangeNameField.bind(this);
    this._handleChangeName = this._handleChangeName.bind(this);
  }

  _showChangeNameField(e){
    e.preventDefault();
    this.setState({isEditName: true})
  }

  _handleChangeName(e) {
    e.preventDefault();
    const userId = this.props.match.params.id;
    const newName = this.state.changeName;
    this.props.updateHostName(userId, newName)
    setTimeout(this.setState({isEditName: false}), 100)

  }

  componentWillMount() {
    const hostId = this.props.match.params.id;
    this.props.getFollower(hostId);
    this.props.getFollowing(hostId);
  }
  render() {
    const user = this.props.host;
    const follower = this.props.follower.length;
    const following = this.props.following.length;
    if (this.props.follower){
    return (
        <div id="profile-sidebar">
          <div id="profile-info">
            <Image
              id="Image-profile-pic"
              src={user.profilePicture}
              size="medium"
              circular
            />
            {this.state.isEditName
              ? <div>
                <input value={this.state.changeName} onChange={ (e) => this.setState({changeName: e.target.value})} />
                <Icon name="check" onClick={this._handleChangeName} />
              </div>
              : <div>
                <span>{`${user.firstName} ${user.lastName}`}</span>
                <span> <Icon name="edit"  onClick={this._showChangeNameField} /> </span>
              </div>
            }
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

const mapState = state => {
  return {
  user: state.user,
  content: state.content,
  follower: state.follower,
  following: state.following
  }
};

const mapDispatch = dispatch => ({
  getFollowing(id) {
    dispatch(fetchFollowing(id));
  },
  getFollower(id) {
    dispatch(fetchFollower(id));
  },
  updateHostName(id, name){
    dispatch(updateOneHostName(id, name))
  }
});

export default withRouter(connect(mapState, mapDispatch)(ProfileSidebar));
