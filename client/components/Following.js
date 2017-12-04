import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import { UserCard } from '../components';
import { fetchFollowing } from '../store';

export class Following extends Component {
  constructor(){
      super();
      this.state = {
        itemsPerRow: '4',
      };
      this._getColor = this._getColor.bind(this);
  }
  componentDidMount(){
    this.props.getFollowing()
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
    if (following.length){
    return (
        <div id="friends-list" >
        <h2>Following</h2>
        {following.length && following.map(user => {
              return (
                <NavLink key={user.id} to={`/profile/${user.id}`}>
                  <UserCard singleUser={user} />
                </NavLink>
              );
            })}
        </div>
    )}
    else {return <div />}
}
}

const mapState = state => ({
  following: state.following
})

const mapDispatch = (dispatch, ownProps) => ({
  getFollowing(){
    const id = ownProps.match.params.id;
    dispatch(fetchFollowing(id))
  }
})


export default withRouter(connect(mapState, mapDispatch)(Following));
