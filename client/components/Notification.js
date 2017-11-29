import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { FullCard } from '../components';
import { editOneContent } from '../store';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentWillUnmount(){
    const newContent = this.props.content.filter( article => article.isNew === true && article.sharedFrom > 0 );
    const updatedContent = newContent.map( function(oneContent){
      Object.assign(oneContent);
      oneContent.isNew = false
      return oneContent
    })
    updatedContent.map(oneContent => this.props.markAsOld(oneContent))
  }
  
  render() {
    const newContent = this.props.content.filter( article => article.isNew === true && article.sharedFrom > 0 );
    return (
      <div id="main-page">
      {newContent.map(oneContent => <FullCard story={oneContent} />)}
      </div>);
  }
}

const mapState = state => ({
  content: state.content,
  following: state.following
})

const mapDispatch = dispatch => {
  return {
    markAsOld(id, old){
      dispatch(editOneContent(id, old))
    }
  }
}

export default connect(mapState, mapDispatch)(Notification);
