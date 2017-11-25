import React, { Component } from 'react'
import { Icon, Label } from 'semantic-ui-react'
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
    const { theme, connectDropTarget, isOver, name } = this.props;
    return connectDropTarget(
      <div>
      <Icon color={theme} name={open || isOver ? 'folder open outline' : 'folder outline'} size="huge" onMouseOver={() => this.setState({open: true})} onMouseOut={() => this.setState({open: false})} />
      <Label basic color={theme} size="small">{name}</Label>
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

