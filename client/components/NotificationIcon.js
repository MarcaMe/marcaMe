import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom'


class Notification extends Component {

  render(){
    return(
      <div>
      <NavLink to="/notification">
      <Icon name="mail"
      size="big"
      color={this.props.theme}
      > 
      </Icon>
      </NavLink>
      </div>
    )
  }
}

const mapState = state => {
  return {
    theme: state.theme
  }
}


export default connect(mapState)(Notification)