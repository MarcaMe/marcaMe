import React from 'react';
import { connect } from 'react-redux';
import { getSingleContent } from '../store/content';
import ReactHtmlParser from 'react-html-parser';
import { Container, Sticky } from 'semantic-ui-react';
import ReaderNav from './ReaderNav';

class OneArticle extends React.Component {
  componentDidMount() {
    this.props.getSingleContent();
  }
  render() {
    const article = this.props.article.length ? this.props.article[0] : null;
    return (
      article && (
        <div id="one-article-viewer">
            <Sticky>
            <ReaderNav content={article} />
            </Sticky>
          <div id="one-article-text">
            <Container text>
              <h1>{article.title}</h1>
              <h5>{`Saved on ${Date(article.createdAt)}`}</h5>
              <div className="header-container">
                <h3>{article.author && `By ${article.author}`}</h3>
                <a href={article.url}>
                  {' '}
                  <h3>Go to original </h3>
                </a>
              </div>
            </Container>
            <Container text>{ReactHtmlParser(article.content)}</Container>
          </div>
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OneArticle);
