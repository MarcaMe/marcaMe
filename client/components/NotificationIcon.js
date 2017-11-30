import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.newNotification = this.newNotification.bind(this);
  }

  newNotification() {
    for (let i = 0; i < this.props.content.length; i++) {
      if (
        this.props.content[i].isNew === true &&
        this.props.content[i].sharedFrom > 0
      ) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <div>
        <NavLink to="/notification">
          <Icon.Group size="large">
            <Icon name="mail" color={this.props.theme} />
            {this.newNotification() ? (
              <Icon corner name="circle" color="red" />
            ) : null}
          </Icon.Group>
        </NavLink>
      </div>
    );
  }
}

const mapState = state => {
  return {
    theme: state.theme,
    content: state.content
  };
};

export default connect(mapState)(Notification);
