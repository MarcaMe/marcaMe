import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchResult } from '../components';
import { fetchFriend } from '../store';


class SearchFriends extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchEmail: '',
            renderSearchResult : false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.findAFriend(this.state.searchEmail)
        setTimeout( () => this.setState({ renderSearchResult : true }), 100)
      }

    render(){        
        return (
            <div>
            <form>
            <input placeholder='search by email'
            name="search"
            type="text"
            onChange={e => this.setState({ searchEmail: e.target.value })}
            value={this.state.searchEmail}
             />
             <button type="button"
             onClick={this.handleSubmit}> Go! </button>
            </form>
            <SearchResult render={this.state.renderSearchResult}/>            
            </div> 
        )
    }
}

const mapDispatch = dispatch => {
    return{
        findAFriend(email){
            dispatch(fetchFriend(email))
        }
    }
}


export default connect(null, mapDispatch)(SearchFriends);
