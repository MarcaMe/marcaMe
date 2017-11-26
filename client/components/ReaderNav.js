import React from 'react';
import { connect } from 'react-redux';
import { getSingleContent, deleteOneContent, editOneContent } from '../store/content';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import history from '../history';


class ReaderNav extends React.Component {

  componentDidMount() {
    this.props.getSingleContent();
  }
  _handleClick(evt, field){
    evt.preventDefault()
    this.setState({[field]: !this.state[field]}, () => this.props.editContent(field, this.state[field]))
  }

  render() {
    console.log(history)
    const content = this.props.content;
    const editContent = this.props.editContent;
    return (
      <div id="reader-nav">
        <div className="reader-icon-container">
            <Icon
              onClick={() => history.goBack()}
              className="reader-nav-icon"
              id="back"
              name="arrow left"
              size="big"
            />
            <h5 className="reader-nav-text">Go back</h5>
        </div>
        <div className="reader-icon-container" onClick={ evt => editContent(evt, 'isFavorite', !content.isFavorite)}>
          <Icon
            className="reader-nav-icon"
            id="heart-icon"
            name="heart"
            size="big"
            color={content.isFavorite && 'red'}
          />
          <h5 className="reader-nav-text">{content.isFavorite ? 'Liked!' : 'Like'}</h5>
        </div>
        <div className="reader-icon-container">
          <Icon
            id="share-icon"
            size="big"
            name="external"
            onClick={evt => editContent(evt, 'isPublic', !content.isPublic)}
            color={content.isPublic && 'blue'}
          />
          <h5 className="reader-nav-text">{content.isPublic ? 'Shared!' : 'Share'}</h5>
        </div>
        <div className="reader-icon-container" onClick={ evt => editContent(evt,'isArchived', !content.isArchived)}>
          <Icon
            className="reader-nav-icon"
            id="archive-icon"
            name="archive"
            size="big"
            color={content.isArchived && 'teal'}
          />
          <h5 className="reader-nav-text">{content.isArchived ? 'Archived!' : 'Archive'}</h5>
        </div>
        <div
          className="reader-icon-container"
          onClick={evt => this.props.deleteContent(evt)}
        >
          <Icon
            className="reader-nav-icon"
            id="trash-icon"
            name="trash"
            size="big"
          />
          <h5 className="reader-nav-text">Trash</h5>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = Number(ownProps.content.id);
  return {
    getSingleContent() {
      dispatch(getSingleContent(id));
    },
    deleteContent(evt) {
      evt.preventDefault();
      dispatch(deleteOneContent(id));
    },
    editContent(evt, field, value) {
      evt.preventDefault();
      const contentBody = {id, [field]: value}
      dispatch(editOneContent(contentBody));
    }
  };
};

export default connect(null, mapDispatchToProps)(ReaderNav);
