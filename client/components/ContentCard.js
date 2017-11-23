import React from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image } from 'semantic-ui-react';

const truncateDescription = story => {
  const titleArr = story.title.split(' ');
  const desArr = story.description.split(' ');
  if (titleArr.length > 8 && desArr.length > 16) return desArr.slice(0, 16).join(' ') + '...';
  else if (desArr.length > 19) return desArr.slice(0, 19).join(' ') + '...';
  else return story.description;
};

class ContentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLike: false
    };
    this.toggleLike = this.toggleLike.bind(this);
  }

  toggleLike(evt) {
    evt.preventDefault();
    this.setState({ isLike: !this.state.isLike });
    console.log(evt.target.className);
  }

  render() {
    return (
      <Card
        style={{ width: '300px', height: '350px', margin: '0.5vw' }}
        color={this.props.color}
        className="card"
        fluid
      >
        <Card.Content style={{ overflow: 'hidden' }}>
          <Card.Header>{this.props.story.title}</Card.Header>
          <div
            style={{ margin: '10px auto', overflow: 'hidden', height: '150px' }}
          >
            <Image
              style={{ width: '100%', display: 'block' }}
              fluid
              src={this.props.story.imageUrl}
            />
          </div>
          <Card.Meta>
            <span className="date">{this.props.story.date}</span>
          </Card.Meta>
          <Card.Description style={{ fontSize: '1em' }} className="description">
            {truncateDescription(this.props.story)}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon
            size="large"
            name={this.state.isLike ? 'heart' : 'empty heart'}
            onClick={evt => this.toggleLike(evt)}
          />

          <Icon
            size="large"
            name="trash"
            onClick={evt => this.props.deleteContent(evt, this.props.id)}
          />
        </Card.Content>
      </Card>
    );
  }
}

export default connect(null)(ContentCard);
