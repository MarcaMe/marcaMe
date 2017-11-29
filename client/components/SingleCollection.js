import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Header, Icon } from 'semantic-ui-react';
import { LeftSideBar, FullCard } from '../components';
import { fetchCollectionContent, deleteOneContent, deleteCollection } from '../store';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'


export class SingleCollection extends Component {

  componentDidMount() {
    this.props.fetchAllCollectionContent({id: +this.props.match.params.collectionId});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.collectionId !== nextProps.match.params.collectionId) {
      this.props.fetchAllCollectionContent({id: +nextProps.match.params.collectionId});
    }
  }

  render() {
    const { singlecollection, user, deleteSingleCollection } = this.props;
    return (
      <div id="main-page">
      <LeftSideBar  />
      <div id="content-home">
      <div style={{display: 'flex', justifyContent: 'flex-start'}}>
      <Header size="huge">{singlecollection.name}</Header>
      <Icon className="hover-button" id="delete-button" name="delete" size="big" onClick={() => deleteSingleCollection(singlecollection)} />
      </div>
        <Card.Group >
          {singlecollection.contents ?
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
                  singleCollection={true}
                  />
                  </NavLink>
                );
              }) : ''}
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
    dispatch(fetchCollectionContent(collection))
  },
  deleteSingleContent(evt, contentId) {
    evt.preventDefault();
    dispatch(deleteOneContent(contentId));
  },
  deleteSingleCollection(collection) {
     dispatch(deleteCollection(collection))
  }
});

export default connect(mapState, mapDispatch)(SingleCollection)

SingleCollection.propTypes = {
  fetchAllCollectionContent: PropTypes.func.isRequired,
  deleteSingleContent: PropTypes.func.isRequired,
  singlecollection: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}
