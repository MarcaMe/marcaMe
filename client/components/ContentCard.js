import React from 'react';
import { connect } from 'react-redux';
import { Card,  Image, Icon, Popup } from 'semantic-ui-react';

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
      isLike: false,
      isPublic: this.props.story.isPublic
    };
    this.showShare = this.showShare.bind(this);
  }

  showShare()  {
    return ( <Popup
      trigger={
        <Icon
          className="content-card-share"
          size="large"
          name="reply"
          color="yellow"
        />
      }
      size="mini"
      on="hover"
      content={`Shared from friends`}
    /> )
  }

  render() {
    return (
        <Card.Content style={{ overflow: 'hidden' }}>
        {
          this.props.story.sharedFrom  > 0 && this.props.following.length
          ? this.showShare()
          : null
        }
          <Card.Header textAlign="center">{this.props.story.title}</Card.Header>
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
          <Card.Description style={{ fontSize: '1em', fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif" }} className="description">
            {truncateDescription(this.props.story)}
          </Card.Description>
        </Card.Content>
    );
  }
}
const mapState = state => ({
  article: state.content,
  following: state.following
});

export default connect(mapState)(ContentCard);
