import React from 'react';
import { connect } from 'react-redux';
import { getSingleContent, deleteOneContent, editOneContent } from '../store/content';
import { Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class ReaderNav extends React.Component {
  componentDidMount() {
    this.props.getSingleContent();
  }
  render() {

    return (
            <div id="reader-nav">
              <div className="reader-icon-container">
              <Link to={'/home'}>
                <Icon className="reader-nav-icon" id="back" name="arrow left" size="big" />
                <h5 className="reader-nav-text">Go back</h5>
              </Link>
              </div>
              <div className="reader-icon-container">
                <Icon className="reader-nav-icon" id="heart" name="heart" size="big" />
                <h5 className="reader-nav-text">Favorite</h5>
              </div>
              <div className="reader-icon-container">
                <Icon className="reader-nav-icon" id="archive" name="archive" size="big" />
                <h5 className="reader-nav-text">Archive</h5>
              </div>
              <div className="reader-icon-container" onClick={ evt => this.props.deleteContent(evt)}>
                <Icon className="reader-nav-icon" id="trash" name="trash" size="big" />
                <h5 className="reader-nav-text">Trash</h5>
              </div>
            </div>
    );
  }
}

const mapStateToProps = state => ({
  article: state.content
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = Number(ownProps.content.id);
  return {
    getSingleContent() {
      console.log("!!!!!!!!!!!!!!!!!!!!!!", ownProps)
      dispatch(getSingleContent(id));
    },
    deleteContent(evt){
      evt.preventDefault();
      dispatch(deleteOneContent(id, ownProps.history))
    },
    editContent(evt){
      evt.preventDefault();
      dispatch(editOneContent())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReaderNav);
