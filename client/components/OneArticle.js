import React from 'react';
import { connect } from 'react-redux';
import { getSingleContent } from '../store/content';
import ReactHtmlParser from 'react-html-parser';
import { Container } from 'semantic-ui-react';
class OneArticle extends React.Component {
  componentDidMount() {
    this.props.getSingleContent();
  }

  render() {
    const article = this.props.article.length ? this.props.article[0] : null;
    return (
      article && (
        <div>
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OneArticle);
