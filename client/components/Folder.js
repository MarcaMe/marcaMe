import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './FullCard'


const folderTarget = {
  drop(props, monitor) {
    console.log('Dropped');
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}


class Folder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    const { open } = this.state;
    const { theme, connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div>
      <Icon color={theme} name={open || isOver ? 'folder open' : 'folder'} size="huge" onMouseOver={() => this.setState({open: true})} onMouseOut={() => this.setState({open: false})} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    theme: state.theme
  }
}

export default DropTarget(ItemTypes.CARD, folderTarget, collect)(connect(mapState)(Folder));

