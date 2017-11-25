import React from 'react';
import { connect } from 'react-redux';
import { getSingleContent } from '../store/content';
import ReactHtmlParser from 'react-html-parser';
import { Container, Sticky } from 'semantic-ui-react';
import ReaderNav from './ReaderNav';
import { NavLink } from 'react-router-dom'

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
            <ReaderNav content={article} />
          </Sticky>
          <Container text>
            <h1>{article.title}</h1>
            <h5>{`Saved on ${Date(article.createdAt)}`}</h5>
            <div className="header-container">
              <h3>{article.author && `By ${article.author}`}</h3>
              <NavLink to={article.url || ''} target="_blank">
                {' '}
                <h3>Go to original </h3>
              </NavLink>
            </div>
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
