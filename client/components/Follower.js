import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


export class Following extends Component {
  constructor(){
      super();
  }
  render() {
console.log("wow you hit me")
    return (
        <div>
         <h1> this is the follower page! </h1>
        </div>
    )
}
}


export default withRouter(connect(null)(Following));