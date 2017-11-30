import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, Label, Icon } from 'semantic-ui-react';

class EditUser extends Component {

  render(){
    return(
      <Form>
        <Form.Group widths='equal'>
          <Form.Input label='First name' placeholder='First name' />
          <Form.Input label='Last name' placeholder='Last name' />
        </Form.Group>
        <Form.TextArea label='About' placeholder='Tell us more about you...' />
        <Form.Button>Submit</Form.Button>
      </Form>      
      )
  }
}

const mapState = state => ({
  user: state.user,
});
const mapDispatch = dispatch => ({
});
export default connect(mapState, mapDispatch)(EditUser);

