import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'


class Folder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    const { open } = this.state;
    return (
      <Icon color="teal" name={open ? 'folder open' : 'folder'} size="huge" onMouseOver={() => this.setState({open: true})} onMouseOut={() => this.setState({open: false})} />
    )
  }
}


export default Folder;

