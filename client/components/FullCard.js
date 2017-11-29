import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import { GeneralCardIcons, ContentCard } from '../components';
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
    this._getColor = this._getColor.bind(this);
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

  render() {
    const { connectDragSource, isDragging, singleCollection } = this.props;
    return connectDragSource(
      <div>
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
          <ContentCard
            story={this.props.story}
            id={this.props.id}
            deleteContent={this.props.deleteSingleContent}
          />
          <Card.Content extra>
            <GeneralCardIcons
              id={this.props.id}
              story={this.props.story}
              singleCollection={singleCollection}
            />
          </Card.Content>
        </Card>
      </div>
    );
  }
}


export default DragSource(ItemTypes.CARD, cardSource, collect)(FullCard);
