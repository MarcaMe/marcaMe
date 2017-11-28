import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchResult } from '../components';
import { fetchFriend } from '../store';
import { Input, Button } from 'semantic-ui-react';

class SearchFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchEmail: '',
      renderSearchResult: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.findAFriend(this.state.searchEmail);
    setTimeout(() => {
      if (this.props.searchFriends.length)
        this.setState({ renderSearchResult: true });
    }, 100);
  }

  render() {
    if (this.state.renderSearchResult) {
      return <SearchResult render={this.state.renderSearchResult} />;
    } else {
      return (
        <div id="change-theme" style={{width: '230px', display: 'flex', justifyContent: 'space-between'}}>
          <Input
            focus
            placeholder="search for friends by email"
            name="search"
            size="small"
            onChange={evt => this.setState({ searchEmail: evt.target.value })}
            value={this.state.searchEmail}
          />
          <Button
            circular
            size="mini"
            type="button"
            onClick={this.handleSubmit}
          >
            Go!
          </Button>
          {this.props.searchFriends.length === 0
            ?( <p> Friend not Found </p> )
           : null}
        </div>
      );
    }
  }
}

const mapState = state => ({
  searchFriends: state.searchFriends
});

const mapDispatch = dispatch => {
  return {
    findAFriend(email) {
      dispatch(fetchFriend(email));
    }
  };
};

export default connect(mapState, mapDispatch)(SearchFriends);
