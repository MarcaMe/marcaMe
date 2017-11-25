import React, { Component } from 'react';
import { connect } from 'react-redux';


class SearchFriends extends Component {
    render(){
        return (
            <div>
            <form>
            <input placeholder="search by email" />
            </form>
            </div> 
        )
    }
}

export default connect()(SearchFriends);
