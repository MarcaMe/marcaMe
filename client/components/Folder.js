import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';


class Folder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    const { open } = this.state;
    const { theme } = this.props;
    return (
      <Icon color={theme} name={open ? 'folder open' : 'folder'} size="huge" onMouseOver={() => this.setState({open: true})} onMouseOut={() => this.setState({open: false})} />
    )
  }
}

const mapState = state => {
  return {
    theme: state.theme
  }
}

export default connect(mapState)(Folder);

