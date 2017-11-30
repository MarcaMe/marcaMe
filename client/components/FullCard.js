import React, { Component } from 'react';
import { Card, Loader } from 'semantic-ui-react';
import { GeneralCardIcons, ContentCard, AllTags } from '../components';
import { DragSource } from 'react-dnd';

export const ItemTypes = {
  CARD: 'CARD'
};
const cardSource = {
  beginDrag(props) {
    return props.story;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export class FullCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTagsOpen: true
    }
    this._getColor = this._getColor.bind(this);
    this.handleTagsComponent = this.handleTagsComponent.bind(this);
  }

  _getColor(index) {
    const colors = [
      'green',
      'teal',
      'blue',
      'green',
      'olive',
      'violet',
      'purple'
    ];
    return colors[index % this.props.length];
  }

  handleTagsComponent() {
    this.setState({ isTagsOpen: !this.state.isTagsOpen })
  }

  render() {
    const { connectDragSource, isDragging, renderRemove } = this.props;
    return connectDragSource(
      <div>
      {!this.props.story.title ?
        <Card
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '300px',
          height: '350px',
          margin: '0.5vw',
          opacity: isDragging ? '.2' : '1'
        }}
        color={this._getColor(this.props.index % 7)}
        className="card"
        fluid
        >
        <Card.Content >
        <Loader active inline="centered" />
        </Card.Content>
        </Card> :
        <Card
          style={{
            width: '300px',
            height: '350px',
            margin: '0.5vw',
            opacity: isDragging ? '.2' : '1'
          }}
          color={this._getColor(this.props.index % 7)}
          className="card"
          fluid
          >
         {
              this.state.isTagsOpen ?
                <ContentCard
                  story={this.props.story}
                  id={this.props.id}
                  deleteContent={this.props.deleteSingleContent}
                /> :
                <AllTags tags={this.props.story.tags} />
            }
          <Card.Content extra>
            <GeneralCardIcons
              id={this.props.id}
              story={this.props.story}
              renderRemove={renderRemove}
            />
          </Card.Content>
        </Card>}
      </div>
    );
  }
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(FullCard);
