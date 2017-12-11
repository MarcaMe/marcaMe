import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { LeftSideBar, FullCard } from '../components';
import { fetchAllContentForUser, deleteOneContent } from '../store/content';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'

export class ContentHome extends Component {

  componentDidMount() {
    this.props.fetchAllContentofUser();
  }

  render() {
    const content = this.props.content.filter(singleContent => {
      if (singleContent.sharedFrom === 0 || !singleContent.sharedFrom){
        return singleContent; 
      } 
    });
    const filter = this.props.filter;
    return  (
      <div id="main-page">
          <LeftSideBar />
        <div id="content-home">
          <Card.Group >
            {content.length ?
              content
                .filter(filteredUserContent => {
                  switch (filter) {
                    case 'favorites':
                    return filteredUserContent.isFavorite;
                    case 'archived':
                    return filteredUserContent.isArchived;
                    default:
                    return filteredUserContent;
                  }
                })
                .map((story, index) => {
                  return (
                    <NavLink key={story.id} to={`/content/${story.id}`}>
                    <FullCard
                    story={story}
                    id={this.props.user.id}
                    deleteContent={this.props.deleteSingleContent}
                    index={index}
                    length={this.props.content.length}
                    tags={this.props.content}
                    />
                    </NavLink>
                  );
                }) : null}
          </Card.Group>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  content: state.content,
  filter: state.filter
});

const mapDispatch = dispatch => ({
  fetchAllContentofUser() {
    dispatch(fetchAllContentForUser());
  },
  deleteSingleContent(evt, contentId) {
    evt.preventDefault();
    dispatch(deleteOneContent(contentId));
  }
});

export default connect(mapState, mapDispatch)(ContentHome);

ContentHome.propTypes = {
  user: PropTypes.object.isRequired,
  content: PropTypes.array.isRequired,
  fetchAllContentofUser: PropTypes.func.isRequired,
  deleteSingleContent: PropTypes.func.isRequired
}
