import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { editOneContent, deleteOneContent } from '../store/content';

class GeneralCardIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.story.isFavorite,
      isArchived: this.props.story.isArchived,
      isPublic: this.props.story.isPublic
    };
    this._handleEditClick = this._handleEditClick.bind(this);
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

  render() {
    return (
      <div>
        <Icon size="large" name="tags" />
        <Icon
          id="share-icon"
          size="large"
          name="external"
          onClick={evt => this._handleEditClick(evt, 'isPublic')}
          color={this.state.isPublic ? 'blue' : ''}
        />
        <Icon
            id="archive-icon"
            name="archive"
            size="large"
            color={this.state.isArchived ? 'teal' : ''}
            onClick={evt => this._handleEditClick(evt, 'isArchived')}
          />
        <Icon
          id="heart-icon"
          name="heart"
          size="large"
          color={this.state.isFavorite ? 'red' : ''}
          onClick={evt => this._handleEditClick(evt, 'isFavorite')}
        />
        <Icon
          id="trash-icon"
          size="large"
          name="trash"
          onClick={evt => this.props.deleteContent(evt, this.props.story.id)}
        />
      </div>
    );
  }
}
const mapState = state => ({
  article: state.content
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
  };
};

export default connect(mapState, mapDispatch)(GeneralCardIcons);
