import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image } from 'semantic-ui-react';
import { ContentCard } from './ContentCard';
import { fetchAllContent } from '../store/content';
import { NavLink } from 'react-router-dom';


export class ContentHome extends Component {
  //hardcoding screen sizes for testing
  //need to change based on document size
  constructor(props) {
    super(props);
    this.state = {
      itemsPerRow: '4'
    };
    this._getColor = this._getColor.bind(this)
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
      <div id="content-home">
        <Card.Group itemsPerRow={this.state.itemsPerRow}>
          {content.length &&
            content.filter(content => content.userId === this.props.user.id).map((story, index) => {
              return (
                <NavLink to={`content/${story.id}`}>
                <ContentCard
                  color={this._getColor(index)}
                  story={story}
                  key={index}
                />
                </NavLink>
              );
            })}
        </Card.Group>
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
  }
});

export default connect(mapState, mapDispatch)(ContentHome);
