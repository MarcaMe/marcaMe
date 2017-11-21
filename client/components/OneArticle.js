import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { getSingleContent } from '../store/content';

class OneArticle extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSingleContent()
  }

  render() {
    let article;
    if(this.props.content){
      article = this.props.content[0];
      }
      return article&& (
          <div>
            <h1>{article.title}</h1>
            <h2>{article.author} </h2>
          </div>
        );  
  }
}

const mapStateToProps = state => ({
  article: state.article
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
     getSingleContent () {
      dispatch(getSingleContent(id))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(OneArticle);
