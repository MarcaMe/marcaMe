import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FullCard, LeftSideBar } from '../components';
import { editOneContent, fetchAllUsers, fetchAllContentForUser } from '../store';
import { Card } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.props.getAllUsers();
    this.props.fetchAllContentofUser();
  }
  componentWillUnmount() {
    const newContent = this.props.content.filter(
      article => article.isNew === true && article.sharedFrom > 0
    );
    const updatedContent = newContent.map(function(oneContent) {
      Object.assign(oneContent);
      oneContent.isNew = false;
      return oneContent;
    });
    updatedContent.map(oneContent => this.props.markAsOld(oneContent));
  }

  render() {
    const sharedContent = this.props.content.filter(
      article => article.sharedFrom > 0 && article.userId === this.props.user.id
    );
    return (
      <div id="main-page">
        <LeftSideBar />
        <div id="content-home">
          <h2>Inbox</h2>
          <Card.Group>
            {sharedContent.map(oneContent => (
              <NavLink key={oneContent.id} to={`/content/${oneContent.id}`}>
                <FullCard
                  key={oneContent.id}
                  story={oneContent}
                  isNew={oneContent.isNew}
                  users={this.props.users}
                />
              </NavLink>
            ))}
          </Card.Group>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  content: state.content,
  following: state.following,
  user: state.user,
  users: state.searchFriends
});

const mapDispatch = dispatch => {
  return {
    markAsOld(id, old) {
      dispatch(editOneContent(id, old));
    },
    getAllUsers(){
      dispatch(fetchAllUsers())
    },
    fetchAllContentofUser() {
      dispatch(fetchAllContentForUser());
  },
  };
};

export default connect(mapState, mapDispatch)(Notification);
