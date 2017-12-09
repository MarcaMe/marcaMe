import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editUser } from '../store';
import { Form, Input, Button } from 'semantic-ui-react';
import history from '../history';
import filestack from 'filestack-js';
import '../../secrets';

export class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      fnError: false,
      lnError: false,
      success: false,
      profilePicture: props.user.profilePicture
    };
  }
  _handleChange(field, value) {
    this.setState({ [field]: value });
  }
  _handleSubmit(evt, userId) {
    evt.preventDefault();
    if (this.state.firstName && this.state.lastName) {
      this.props.editUserInfo(
        userId,
        this.state.firstName,
        this.state.lastName,
        this.state.profilePicture
      );
      this.setState({ fnError: false, lnError: false, success: true });
      history.push('/home');
    }
    if (!this.state.firstName) this.setState({ fnError: true });
    if (!this.state.lastName) this.setState({ lnError: true });
  }
  _showForm() {
    const FSclient = filestack.init(process.env.FILESTACK_API_KEY);
    FSclient.pick({
      maxFiles: 1,
      transformations: { crop: { force: true }, circle: true }
    })
      .then(data => {
        this.setState({ profilePicture: data.filesUploaded[0].url });
      })
      .catch(error => console.error(error));
  }
  render() {
    const { firstName, lastName, fnError, lnError, success } = this.state;
    const user = this.props.user;
    return (
      <div id="login-container">
        <h2>Edit your information</h2>
        <div className="edit-user-info">
          <img id="edit-user-img" src={this.state.profilePicture} />
          <div id="edit-user-text">
            <h5 className="edit-user-content">{user.firstName && `${user.firstName} ${user.lastName}`}</h5>
            <h5 className="edit-user-content">{user.email}</h5>
          </div>
        </div>
        <Button id="pic-upload-button" onClick={() => this._showForm()}>Upload Picture</Button>
        <Form onSubmit={evt => this._handleSubmit(evt, user.id)}>
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
            {fnError && (
              <p style={{ color: 'red' }}>* First name cannot be empty</p>
            )}
            <Form.Field required>
              <label>Last Name</label>
              <Input
                placeholder="Last name"
                value={lastName}
                onChange={evt =>
                  this._handleChange('lastName', evt.target.value)}
              />
            </Form.Field>
            {lnError && (
              <p style={{ color: 'red' }}>* Last name cannot be empty</p>
            )}
          </Form.Group>
          <Form.Button>{success ? 'Saved!' : 'Submit'}</Form.Button>
        </Form>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user
});
const mapDispatch = dispatch => ({
  editUserInfo(id, firstName, lastName, profilePicture) {
    const editBody = {
      id,
      firstName,
      lastName,
      profilePicture
    };
    dispatch(editUser(editBody));
  }
});
export default connect(mapState, mapDispatch)(EditUser);
