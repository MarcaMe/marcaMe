import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { fetchOneArticle } from '../store/article';

class OneArticle extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const runit = fetchOneArticle();
    store.dispatch(runit);
  }

  render() {
    if (this.props.article.content) {
      const article = this.props.article;
      const contents = article.content;
      //console.log("!!!!!!!!", contents);
      return (
        <div>
          <h1>{article.title}</h1>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => ({
  article: state.article
});

export default connect(mapStateToProps)(OneArticle);
