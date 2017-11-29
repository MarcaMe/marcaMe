import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';
import history from '../history';

class SearchFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: ''
    };
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

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <Search
        className="friends-search"
        placeholder="Search for friends"
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        resultRenderer={user => (
          <div id="search-result">
            {`${user.firstName} ${user.lastName}`}{' '}
            <img id="search-result-img" src={user.profilePicture} />
          </div>
        )}
      />
    );
  }
}

const mapState = state => ({
  searchFriends: state.searchFriends
});

export default connect(mapState)(SearchFriends);
