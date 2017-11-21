import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { getSingleContent } from '../store/content';

class OneArticle extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //const runit = fetchOneArticle();
    //store.dispatch(runit);
    this.props.getSingleContent()
  }

  render() {
    // if (this.props.article.content) {
    //   const article = this.props.article;
    //   const contents = article.content;
      //console.log("!!!!!!!!", contents);
      return (
        <div>
          <h1>wow</h1>
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
