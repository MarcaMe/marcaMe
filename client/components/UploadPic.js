import React, { Component } from 'react';
import { connect } from 'react-redux';
import filestack from 'filestack-js';
import { Form, Input, Modal, Button } from 'semantic-ui-react';
export class UploadPic extends Component {
  render() {
    const FSclient = filestack.init("A1YMWRS8PQPWfOq6iGuC5z");
    const user = this.props.user;
    return (
        <Modal>
          {FSclient.pick({})}
        </Modal>
    );
  }
}

const mapState = state => ({
  user: state.user
});
const mapDispatch = dispatch => ({
});
export default connect(mapState, mapDispatch)(UploadPic);
