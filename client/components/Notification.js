import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FullCard, LeftSideBar } from '../components';
import { editOneContent } from '../store';
import {Card } from 'semantic-ui-react';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    const newContent = this.props.content.filter(
      article => article.isNew === true && article.sharedFrom > 0
    );
    const sharedContent = this.props.content.filter(
      article => article.sharedFrom > 0 && article.userId === this.props.user.id
    );
    return (
      <div id="main-page">
        <LeftSideBar />
        <div id="content-home">
          <h2>Inbox</h2>
          <Card.Group >
          {sharedContent.map(oneContent => (
            <FullCard
              key={oneContent.id}
              story={oneContent}
              isNew={oneContent.isNew}
            />
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
  user: state.user
});

const mapDispatch = dispatch => {
  return {
    markAsOld(id, old) {
      dispatch(editOneContent(id, old));
    }
  };
};

export default connect(mapState, mapDispatch)(Notification);
