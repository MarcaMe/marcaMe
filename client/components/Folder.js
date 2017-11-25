import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './FullCard'
import { editOneContent } from '../store'


const folderTarget = {
  drop(props, monitor) {
    const story = monitor.getItem();
    const updatedStory = {...story, collectionId: props.id}
    props.addToCollection(updatedStory)
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
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

const mapDispatch = dispatch => {
  return {
    addToCollection: (content, update) => {
      dispatch(editOneContent(content, update))
    }
  }
}

export default connect(mapState, mapDispatch)(DropTarget(ItemTypes.CARD, folderTarget, collect)(Folder));

