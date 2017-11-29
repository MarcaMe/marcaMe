import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { FullCard } from '../components';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
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


export default connect(mapState)(Notification);
