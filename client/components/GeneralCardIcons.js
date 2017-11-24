import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import {editOneContent} from '../store/content';

class GeneralCardIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLike: false,
      isPublic: this.props.story.isPublic
    };
    this.toggleLike = this.toggleLike.bind(this);
    this._handleShareClick = this._handleShareClick.bind(this);
  }

  _handleShareClick(evt) {
    evt.preventDefault();
    this.setState({ isPublic: !this.state.isPublic }, () =>
      this.props.editContent(this.props.id, 'isPublic', this.state.isPublic)
    );
  }
  toggleLike(evt) {
    evt.preventDefault();
    this.setState({ isLike: !this.state.isLike });
    console.log(evt.target.className);
  }

  render() {
    return (
      <div>
        <Icon size="large" name="tags" />
        <Icon
          id="share-icon"
          size="large"
          name="external"
          onClick={evt => this._handleShareClick(evt)}
          color={this.state.isPublic && 'teal'}
        />
        <Icon
          size="large"
          name={this.state.isLike ? 'heart' : 'empty heart'}
          onClick={evt => this.toggleLike(evt)}
        />

        <Icon
          id="trash-icon"
          size="large"
          name="trash"
          onClick={evt => this.props.deleteContent(evt, this.props.id)}
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
    }
  };
};

export default connect(mapState, mapDispatch)(GeneralCardIcons);
