import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editUser } from '../store';
import { Form, Input } from 'semantic-ui-react';
import history from '../history';
export class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      fnError: false,
      lnError: false,
      success: false
    };
  }
  _handleChange(field, value) {
    this.setState({ [field]: value });
  }
  _handleSubmit(evt, userId) {
    evt.preventDefault();
    if (this.state.firstName && this.state.lastName) {
      this.props.editUserInfo(userId, this.state.firstName, this.state.lastName)
      this.setState({fnError:false, lnError:false, success:true});
      history.push('/home')
    }
    if (!this.state.firstName) this.setState({ fnError: true });
    if (!this.state.lastName) this.setState({ lnError: true });
  }

  render() {
    const { firstName, lastName, fnError, lnError, success } = this.state;
    const user = this.props.user;
    return (
      <div id="login-container">
        <h2>Edit your information</h2>
        <Form
          onSubmit={evt => this._handleSubmit(evt, user.id)}
        >
          <Form.Group id="edit-user" widths="equal">
            <Form.Field required>
              <label>First Name</label>
              <Input
                placeholder="First name"
                value={firstName}
                onChange={evt =>
                  this._handleChange('firstName', evt.target.value)}
              />
            </Form.Field>
            {fnError && <p style={{color:'red'}}>* First name cannot be empty</p>}
            <Form.Field required>
              <label>Last Name</label>
              <Input
                placeholder="Last name"
                value={lastName}
                onChange={evt =>
                  this._handleChange('lastName', evt.target.value)}
              />
            </Form.Field>
            {lnError && <p style={{color:'red'}}>* Last name cannot be empty</p>}
          </Form.Group>
          <Form.Button>{success ? 'Saved!': 'Submit'}</Form.Button>
        </Form>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user
});
const mapDispatch = dispatch => ({
  editUserInfo(id, firstName, lastName) {
    const editBody = {
      id,
      firstName,
      lastName
    };
    dispatch(editUser(editBody));
  }
});
export default connect(mapState, mapDispatch)(EditUser);
