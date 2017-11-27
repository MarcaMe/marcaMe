import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Image, Button } from "semantic-ui-react";
import { removeFollowing } from '../store'

export class Following extends Component {
  constructor(props) {
    super(props);
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  handleUnfollow(evt, userId, followingId){
      evt.preventDefault();
    this.props.unfollow(userId, followingId)
  }

  render() {
    const user = this.props.singleUser;
    const host = this.props.host;
    return (
      <div>
        <Card.Content style={{ overflow: "hidden" }}>
          <Image
            style={{ width: "100%", display: "block" }}
            fluid
            src={user.profilePicture}
          />
          <Card.Header>{user.firstName}</Card.Header>
          <Card.Content>
            <span>{user.email}</span>
            {this.props.type === "following" ? (
              <Button basic 
              size="small" 
              color="red"
              onClick={ (evt) => this.handleUnfollow(evt, host.id, user.id)}>
                Unfollow
              </Button>
            ) : null}
          </Card.Content>
          <div
            style={{ margin: "10px auto", overflow: "hidden", height: "150px" }}
          />
        </Card.Content>
      </div>
    );
  }
}
const mapState = state => ({
    host: state.host
})

const mapDispatch = dispatch => ({
    unfollow(evt, followingId){
      dispatch(removeFollowing(evt, followingId))
    }
  })

export default connect(mapState, mapDispatch)(Following);
