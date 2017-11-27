import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Header } from 'semantic-ui-react';
import { LeftSideBar, FullCard } from '../components';
import { fetchCollectionContent, deleteOneContent } from '../store';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'


export class SingleCollection extends Component {

  componentDidMount() {
    this.props.fetchAllCollectionContent({id: +this.props.match.params.collectionId});
  }

  render() {
    const { singlecollection, user } = this.props;
    console.log(this.props)
    return (
      <div id="main-page">
      <LeftSideBar />
      <div id="content-home">
      <Header size="huge">{''}</Header>
        <Card.Group >
          {singlecollection.contents && singlecollection.contents.length &&
            singlecollection.contents
              .map((story, index) => {
                return (
                  <NavLink key={story.id} to={`/content/${story.id}`}>
                  <FullCard
                  story={story}
                  id={user.id}
                  deleteContent={this.props.deleteSingleContent}
                  index={index}
                  length={singlecollection.contents.length}
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
  singlecollection: state.singlecollection
});

const mapDispatch = dispatch => ({
  fetchAllCollectionContent(collection) {
    console.log(collection)
    dispatch(fetchCollectionContent(collection))
  },
  deleteSingleContent(evt, contentId) {
    evt.preventDefault();
    dispatch(deleteOneContent(contentId));
  }
});

export default connect(mapState, mapDispatch)(SingleCollection);

SingleCollection.propTypes = {
  fetchAllCollectionContent: PropTypes.func.isRequired,
  deleteSingleContent: PropTypes.func.isRequired,
  singlecollection: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}
