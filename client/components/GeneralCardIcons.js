import React from 'react';
import { connect } from 'react-redux';
import { Icon, Popup } from 'semantic-ui-react';
import {
  editOneContent,
  deleteOneContent,
  postRemoveFromCollection
} from '../store';
import { SearchFriends } from '../components';

class GeneralCardIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.story.isFavorite,
      isArchived: this.props.story.isArchived,
      isPublic: this.props.story.isPublic,
      isTagsOpen: false,
      displayFriends: false,
      friendsArr: [],
      displaySearchFriends: false,
      percent: 0
    };
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleTags = this._handleTags.bind(this);
    this._shareArticle = this._shareArticle.bind(this);
  }

  _handleEditClick(evt, fieldName) {
    evt.preventDefault();
    this.setState({ [fieldName]: !this.state[fieldName] }, () =>
      this.props.editContent(
        this.props.story.id,
        fieldName,
        this.state[fieldName]
      )
    );
  }

  _shareArticle(evt) {
    evt.preventDefault();
    this.setState({ displaySearchFriends: !this.state.displaySearchFriends });
  }

  _handleTags() {
    this.setState({ isTagsOpen: !this.state.isTagsOpen });
  }

  render() {
    const { renderRemove, deleteFromCollection, singlecollection } = this.props;
    return (
      <div>
        <Popup
          trigger={
            <Icon
              id="tags-icon"
              size="large"
              name="tags"
              onClick={evt => {
                evt.preventDefault();
                this.props.handleTags();
                this._handleTags();
              }}
              color={this.state.isTagsOpen && 'blue'}
            />
          }
          size="mini"
          on="hover"
          content="Add tags"
          position="bottom left"
        />
        <Popup
          trigger={
            <Icon
              id="share-icon"
              size="large"
              name="external"
              onClick={evt => this._handleEditClick(evt, 'isPublic')}
              color={this.state.isPublic ? 'blue' : ''}
            />
          }
          size="mini"
          on="hover"
          content="Share to your profile"
          position="bottom left"
        />
        <Popup
          trigger={
            <Icon
              id="archive-icon"
              name="archive"
              size="large"
              color={this.state.isArchived ? 'teal' : ''}
              onClick={evt => this._handleEditClick(evt, 'isArchived')}
            />
          }
          size="mini"
          on="hover"
          content="Archive"
          position="bottom left"
        />
        <Popup
          trigger={
            <Icon
              id="heart-icon"
              name="heart"
              size="large"
              color={this.state.isFavorite ? 'red' : ''}
              onClick={evt => this._handleEditClick(evt, 'isFavorite')}
            />
          }
          size="mini"
          on="hover"
          content="Favorite"
          position="bottom left"
        />
        <Popup
          trigger={
            <Icon
              id="send-icon"
              size="large"
              name="send"
              onClick={evt => this._shareArticle(evt, this.props.id)}
            />
          }
          size="mini"
          on="hover"
          content="Share to your friends!"
          position="bottom left"
        />
        <Popup
          trigger={
            <Icon
              id="trash-icon"
              size="large"
              name="trash"
              onClick={evt =>
                this.props.deleteContent(evt, this.props.story.id)}
            />
          }
          size="mini"
          on="hover"
          content="Delete"
          position="bottom left"
        />
        {renderRemove ? (
          <Popup
            trigger={
              <Icon
                id="remove-icon"
                size="large"
                name="remove circle outline"
                onClick={evt => {
                  evt.preventDefault();
                  deleteFromCollection(singlecollection, this.props.story);
                }}
              />
            }
            size="mini"
            on="hover"
            content="Remove from collection"
            position="bottom left"
          />
        ) : null}
        {this.state.displaySearchFriends ? (
          <SearchFriends
            allUsers={this.props.users}
            isShareArticle={true}
            storyId={this.props.story.id}
            friend={this.props.host}
          />
        ) : null}
      </div>
    );
  }
}
const mapState = state => ({
  article: state.content,
  singlecollection: state.singlecollection,
  user: state.user,
  users: state.searchFriends,
  host: state.host,
  content: state.content
});

const mapDispatch = dispatch => {
  return {
    editContent(id, field, value) {
      const contentBody = { id, [field]: value };
      dispatch(editOneContent(contentBody));
    },
    deleteContent(evt, contentId) {
      evt.preventDefault();
      dispatch(deleteOneContent(contentId));
    },
    deleteFromCollection(collection, content) {
      dispatch(postRemoveFromCollection(collection, content));
    }
  };
};

export default connect(mapState, mapDispatch)(GeneralCardIcons);
