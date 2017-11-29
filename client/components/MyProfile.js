import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Divider } from 'semantic-ui-react';
import ContentCard from './ContentCard';
import  ProfileSidebar  from './ProfileSidebar';
import { fetchAllContent, deleteOneContent, fetchHost } from '../store';
import { NavLink, withRouter } from 'react-router-dom';


export class MyProfile extends Component {
  //hardcoding screen sizes for testing
  //need to change based on document size
  constructor(props) {
    super(props);
    this.state = {
      itemsPerRow: '4',
    };
    this._getColor = this._getColor.bind(this);
  }

  componentDidMount() {
    const hostId = this.props.match.params.id;
    this.props.getTheHost(hostId)
    this.props.fetchAllContentofUser();
  }

  componentWillReceiveProps(nextProps){
    const hostId = this.props.match.params.id;
    if (nextProps.match.params.id !== hostId) {
      this.props.getTheHost(nextProps.match.params.id)
    }
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
    const host = this.props.host;
    return (
      host && (
        <div id="profile-body">
          <ProfileSidebar />
          <Divider />
          {content.length ?
          <Card.Group itemsPerRow={this.state.itemsPerRow}>
              {content
                .filter(
                  content =>
                    content.userId === host.id && content.isPublic
                )
                .map((story, index) => {
                  return (
                    <NavLink key={story.id} to={`/content/${story.id}`}>
                      <Card
                        style={{
                          width: '300px',
                          height: '350px',
                          margin: '0.5vw'
                        }}
                        color={this._getColor(index)}
                        className="card"
                        fluid
                      >
                        <ContentCard
                          story={story}
                          id={story.id}
                          deleteContent={this.props.deleteSingleContent}
                        />
                      </Card>
                    </NavLink>
                  );
                })}
          </Card.Group>
          : <h1>Add Content to your Public Profile</h1>}
        </div>
      )
    );
  }
}

const mapState = state => ({
  user: state.user,
  content: state.content,
  host: state.host
});

const mapDispatch = dispatch => ({
  fetchAllContentofUser() {
    dispatch(fetchAllContent());
  },
  deleteSingleContent(evt, contentId) {
    evt.preventDefault();
    dispatch(deleteOneContent(contentId));
  },
  getTheHost(id){
    dispatch(fetchHost(id))
  }
});

export default withRouter(connect(mapState, mapDispatch)(MyProfile));
