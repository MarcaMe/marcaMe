import React from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image } from 'semantic-ui-react';

const truncateDescription = des => {
  const desArr = des.split(' ');
  if (desArr.length > 19) return desArr.slice(0, 19).join(' ') + '...';
  else return des;
};

class ContentCard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      heart: 'empty heart'
    }
  }

render(){
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
          {truncateDescription(this.props.story.description)}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
    
      <Icon size="large" name={this.state.heart} onClick={evt => {
        evt.preventDefault();
        this.setState({heart: 'heart'}) }}/>  
      
      <Icon size="large" name="trash"
      onClick={evt => props.deleteContent(evt, this.props.id)} />

  
      </Card.Content>
    </Card>
  )
}
};


export default connect(null)(ContentCard);