import React, { Component } from 'react';
import { connect } from 'react-redux';
import { followFriend } from '../store'

class SearchResult extends Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const followingId = this.props.searchFriends[0].id
        const userId = this.props.user.id;
        this.props.followAFriend(followingId ,userId )
    }

    render(){
    return (
        this.props.render ? 
            this.props.searchFriends.length > 0 ?         
       ( <div>
         <span> { this.props.searchFriends[0].email } </span>
         <button
         type="button"
         onClick={this.handleSubmit}> Follow </button>
         </div> )
            : <div> friendNotFound  </div>
        : <div />
    )
    }

}

const mapState = state => ({
    searchFriends: state.searchFriends,
    user: state.user
})

const mapDispatch = dispatch => {
    return {
        followAFriend(followingId, userId){
            dispatch(followFriend(followingId, userId))
        }
    }
}



export default connect(mapState, mapDispatch)(SearchResult);
