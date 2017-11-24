import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Divider } from 'semantic-ui-react';
import ContentCard from './ContentCard';
import { ProfileSidebar } from './ProfileSidebar';
import { fetchAllContent, deleteOneContent } from '../store/content';
import { NavLink } from 'react-router-dom';

export class MyProfile extends Component {
  //hardcoding screen sizes for testing
  //need to change based on document size
  constructor(props) {
    super(props);
    this.state = {
      itemsPerRow: '4'
    };
    this._getColor = this._getColor.bind(this);
  }
  componentDidMount() {
    this.props.fetchAllContentofUser();
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
    return colors[index % this.props.content.length];
  }

  render() {
    const content = this.props.content;
    const user = this.props.user;
    return (
      user && (
        <div id="profile-body">
          <ProfileSidebar user={user} />
          <Divider />
          <Card.Group itemsPerRow={this.state.itemsPerRow}>
            {content.length &&
              content
                .filter(
                  content =>
                    content.userId === this.props.user.id && content.isPublic
                )
                .map((story, index) => {
                  return (
                    <NavLink key={story.id} to={`content/${story.id}`}>
                      <Card
                        style={{
                          width: '300px',
                          height: '350px',
                          margin: '0.5vw'
                        }}
                        color={this.props.color}
                        className="card"
                        fluid
                      >
                        <ContentCard
                          color={this._getColor(index % 7)}
                          story={story}
                          id={story.id}
                          deleteContent={this.props.deleteSingleContent}
                        />
                      </Card>
                    </NavLink>
                  );
                })}
          </Card.Group>
        </div>
      )
    );
  }
}

const mapState = state => ({
  user: state.user,
  content: state.content
});

const mapDispatch = dispatch => ({
  fetchAllContentofUser() {
    dispatch(fetchAllContent());
  },
  deleteSingleContent(evt, contentId) {
    evt.preventDefault();
    dispatch(deleteOneContent(contentId));
  }
});

export default connect(mapState, mapDispatch)(MyProfile);
