import React, { Component } from 'react'
import { Icon, Label } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './FullCard'
import { postToCollection } from '../store'
import PropTypes from 'prop-types'


const folderTarget = {
  drop(props, monitor) {
    const story = monitor.getItem();
    props.addToCollection(props, story)
  }
};

function collect(toConnect, monitor) {
  return {
    connectDropTarget: toConnect.dropTarget(),
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
      <div className="folder">
      <Icon
      color={theme}
      name={open || isOver ? 'folder open outline' : 'folder outline'}
      size={isOver ? 'huge' : 'big'}
      onMouseOver={() => this.setState({open: true})}
      onMouseOut={() => this.setState({open: false})}
      />
      <Label basic size="small">{name}</Label>
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
    addToCollection: (collection, content) => {
      dispatch(postToCollection(collection, content))
    }
  }
}

export default connect(mapState, mapDispatch)(DropTarget(ItemTypes.CARD, folderTarget, collect)(Folder));

Folder.propTypes = {
  theme: PropTypes.string,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  addToCollection: PropTypes.func.isRequired
}
