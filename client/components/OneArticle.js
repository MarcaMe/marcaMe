import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { getSingleContent } from '../store/content';

class OneArticle extends React.Component {
  componentDidMount() {
    this.props.getSingleContent();
  }

  render() {
    const article = this.props.article.length ? this.props.article[0] : null
    return (
      article && (
      <div>
        <h1>{article.title}</h1>
        <h5>{article.author && article.author}</h5>
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
