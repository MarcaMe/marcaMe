import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchResult extends Component{
    constructor(props){
        super(props)
    }

    handleSubmit(e) {
        e.preventDefault();
        // go to database, update it
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
            : <div> {friendNotFound}  </div>
        : <div />
    )
    }

}

const mapState = state => ({
    searchFriends: state.searchFriends
})

export default connect(mapState)(SearchResult);
