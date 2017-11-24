import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { LeftSideBar, FullCard } from '../components';
import { fetchAllContent, deleteOneContent } from '../store/content';
import { NavLink } from 'react-router-dom';

export class ContentHome extends Component {

  componentDidMount() {
    this.props.fetchAllContentofUser();
  }

  render() {
    const content = this.props.content;
    return content.length ? (
      <div id="main-page">
        <LeftSideBar />
        <div id="content-home">
          <Card.Group >
            {content.length &&
              content
                .filter(content => content.userId === this.props.user.id)
                .map((story, index) => {
                  return (
                    <NavLink key={story.id} to={`content/${story.id}`}>
                    <FullCard
                    story={story}
                    id={this.props.user.id}
                    deleteContent={this.props.deleteSingleContent}
                    index={index}
                    length={this.props.content.length}
                    />
                    </NavLink>
                  );
                })}
          </Card.Group>
        </div>
      </div>
    ) : (
      <div />
    );
  }
}

const mapState = state => ({
  user: state.user,
  content: state.content
});

const mapDispatch = dispatch => ({
  fetchAllContentofUser() {
    dispatch(fetchAllContent());
  },
  deleteSingleContent(evt, contentId) {
    evt.preventDefault();
    dispatch(deleteOneContent(contentId));
  }
});

export default connect(mapState, mapDispatch)(ContentHome);
