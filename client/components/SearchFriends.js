import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Search, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import history from '../history';
import { ShareAContentThunk } from '../store';


class SearchFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: '',
      showCheck: false
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
    const friendId = result.id
    const storyId = this.props.storyId;
    const userId = this.props.user.id;
    this.props.shareThunk(storyId, userId, friendId)
    this.setState({showCheck: true})
}



  render() {
    const { isLoading, value, results } = this.state;
    const isShareArticle = this.props.isShareArticle;
    if(isShareArticle){
   return (
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
          <div id="search-result">
            {`${user.firstName} ${user.lastName}`}{' '}
            <img id="search-result-img" src={user.profilePicture} />
            { this.state.showCheck?  <Icon name="check" color="red" /> : null }
          </div>
        )}
        />
    )
  } else{
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
      <div id="search-result">
        {`${user.firstName} ${user.lastName}`}{' '}
        <img id="search-result-img" src={user.profilePicture} />
      </div>
    )}
    />
  )
  }
  }
}

const mapState = state => ({
  searchFriends: state.searchFriends,
  user: state.user
});

const mapDispatch = dispatch => {
  return {
  shareThunk(storyId, userId, friendId){
      dispatch(ShareAContentThunk(storyId, userId, friendId))
  }
}
}

export default connect(mapState, mapDispatch)(SearchFriends);
