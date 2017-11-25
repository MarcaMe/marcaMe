import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { LeftSideBar, FullCard } from '../components';
import { fetchAllContent, deleteOneContent } from '../store/content';
import { NavLink } from 'react-router-dom';


export class SingleCollection extends Component {

  componentDidMount() {
    this.props.fetchAllContentofUser();
  }

  render() {
    const { content, collections } = this.props;
    console.log(collections)
    return (
      <div id="main-page">
      <LeftSideBar />
      <div id="content-home">
        <h2>Test Name</h2>
        <Card.Group >
          {content.length &&
            content
              .filter(content => content.collectionId === +this.props.match.params.collectionId)
              .map((story, index) => {
                return (
                  <NavLink key={story.id} to={`/content/${story.id}`}>
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
    )
  }
}

const mapState = state => ({
  user: state.user,
  content: state.content,
  collections: state.collections
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

export default connect(mapState, mapDispatch)(SingleCollection);
