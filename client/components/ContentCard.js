import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image } from 'semantic-ui-react';

export class ContentCard extends Component {
  _truncateDescription(des) {
    const desArr = des.split(' ');
    if (desArr.length > 19) return desArr.slice(0, 19).join(' ') + '...';
    else return des;
  }

  render() {
    const story = this.props.story;
    return (
      <Card
        style={{ width: '300px', height: '350px', margin: '0.5vw' }}
        color={this.props.color}
        className="card"
        fluid
      >
        <Card.Content style={{ overflow: 'hidden' }}>
          <Card.Header>{story.title}</Card.Header>
          <div
            style={{ margin: '10px auto', overflow: 'hidden', height: '150px' }}
          >
            <Image
              style={{ width: '100%', display: 'block' }}
              fluid
              src={story.imageUrl}
            />
          </div>
          <Card.Meta>
            <span className="date">{story.date}</span>
          </Card.Meta>
          <Card.Description style={{ fontSize: '1em' }} className="description">
            {this._truncateDescription(story.description)}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <span>
            <Icon size="large" name="user" />
          </span>
          <span>
            <Icon size="large" name="trash" />
          </span>
        </Card.Content>
      </Card>
    );
  }
}

export default connect(null)(ContentCard);
