import React from 'react';
import { connect } from 'react-redux';
import { getSingleContent, deleteOneContent } from '../store/content';
import ReactHtmlParser from 'react-html-parser';
import { Container, Icon, Sticky } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class OneArticle extends React.Component {
  componentDidMount() {
    this.props.getSingleContent();
  }
  render() {
    const article = this.props.article.length ? this.props.article[0] : null;
    return (
      article && (
        <div>
          <Sticky>
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
          </Sticky>
          <Container text>
            <h1>{article.title}</h1>
            <h5>{article.author && article.author}</h5>
            <h5>{`Saved on ${Date(article.createdAt)}`}</h5>
            <h5>
              <a href={article.url}> Go to original </a>
            </h5>
          </Container>
          <Container text>{ReactHtmlParser(article.content)}</Container>
        </div>
      )
    );
  }
}

const mapStateToProps = state => ({
  article: state.content
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    getSingleContent() {
      dispatch(getSingleContent(id));
    },
    deleteContent(evt){
      evt.preventDefault();
      dispatch(deleteOneContent(id, ownProps.history))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OneArticle);
