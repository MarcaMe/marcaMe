import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import { ContentCard } from './ContentCard';
import { LeftSideBar } from '../components'
import { fetchAllContent, deleteOneContent } from '../store/content';
import { NavLink } from 'react-router-dom';

export class ContentHome extends Component {
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
    if (window.innerWidth < 900) this.setState({ itemsPerRow: '3' });
    if (window.innerWidth < 500) this.setState({ itemsPerRow: '1' });
    if (window.innerWidth > 900) this.setState({ itemsPerRow: '4' });
    window.addEventListener('resize', () => {
      if (window.innerWidth < 900) this.setState({ itemsPerRow: '3' });
      if (window.innerWidth < 500) this.setState({ itemsPerRow: '1' });
      if (window.innerWidth > 900) this.setState({ itemsPerRow: '4' });
    });
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
    return (
      <div>
      <LeftSideBar />
      <div id="content-home">
        <Card.Group itemsPerRow={this.state.itemsPerRow}>
          {content.length &&
            content
              .filter(content => content.userId === this.props.user.id)
              .map((story, index) => {
                return (
                  <NavLink key={content.id} to={`content/${story.id}`}>
                    <ContentCard
                      color={this._getColor(index % 7)}
                      story={story}
                      id={story.id}
                      deleteContent={this.props.deleteSingleContent}
                    />
                  </NavLink>
                );
              })}
        </Card.Group>
      </div>
      </div>
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

export default connect(mapState, mapDispatch)(ContentHome);
