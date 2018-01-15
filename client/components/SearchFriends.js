import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Search, Progress, Dimmer } from 'semantic-ui-react';
import _ from 'lodash';
import history from '../history';
import { ShareAContentThunk, addBlankContent } from '../store';
import { setTimeout } from 'core-js/library/web/timers';


class SearchFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: '',
    };
    this.handleShare = this.handleShare.bind(this);
  }

  componentDidMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (evt, { result }) => {
    this.setState({ value: result.firstName + ' ' + result.lastName });
    history.push(`/profile/${result.id}`)
  };

  handleSearchChange = (evt, { value }) => {
    const source = this.props.allUsers;
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result =>
        re.test(result.firstName + ' ' + result.lastName);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch)
      });
    }, 500);
  };

  handleShare(evt, { result }){
    evt.preventDefault();
    this.setState({showCheck: true})
    const friendId = result.id
    const storyId = this.props.storyId;
    const userId = this.props.user.id;
    this.props.shareThunk(storyId, userId, friendId)
    this.resetComponent();
}


  render() {
    const { isLoading, value, results } = this.state;
    const isShareArticle = this.props.isShareArticle;
    const style = {
      borderRadius: 25,
      padding: '1em',
      opacity: 0.7
    }
    if (isShareArticle){
   return (
    <div>
      {this.props.content.length && this.props.content[0].loadingType === 'sendMessage' ? (
        <Dimmer style={style} active>
          <Progress size="tiny" percent={100} inverted color="red" active>Sending message</Progress>
        </Dimmer>) : null}
      <Search
        className="friends-search"
        placeholder="Search for friends"
        loading={isLoading}
        onResultSelect={this.handleShare}
        onSearchChange={this.handleSearchChange}
        onClick={evt => evt.preventDefault() }
        results={results}
        value={value}
        resultRenderer={user => (
          <div key={user.id} id="search-result">
            <img id="search-result-img" src={user.profilePicture} />
            <div id="search-result-name">
            {`${user.firstName} ${user.lastName}`}{' '}
            </div>
          </div>
        )}
        />
        </div>
    )
  } else {
    return (
    <Search
    className="friends-search"
    placeholder="Search for friends"
    loading={isLoading}
    onResultSelect={this.handleResultSelect}
    onSearchChange={this.handleSearchChange}
    onClick={evt => evt.preventDefault() }
    results={results}
    value={value}
    resultRenderer={user => (
      <div key={user.id} id="search-result">
        <img id="search-result-img" src={user.profilePicture} />
        <div id="search-result-name">
        {`${user.firstName} ${user.lastName}`}{' '}
        </div>
      </div>
    )}
    />
  )
  }
  }
}

const mapState = state => ({
  searchFriends: state.searchFriends,
  user: state.user,
  content: state.content
});

const mapDispatch = dispatch => {
  return {
    shareThunk(storyId, userId, friendId){
        dispatch(addBlankContent({loadingType: 'sendMessage'}));
        setTimeout(() =>
          dispatch(ShareAContentThunk(storyId, userId, friendId))
      , 1000)
    }
  }
}

export default connect(mapState, mapDispatch)(SearchFriends);
