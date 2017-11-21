import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { postContentThunk } from '../store/content';
import { webScraping } from '../utilsScraping'

const AddByUrlForm = ({ user, handleSubmit }) => {
  return (
    <Form onSubmit={evt => handleSubmit(evt, user.id)}>
      <h5>Save an item</h5>
      <Form.Field>
        <label>Enter Url</label>
        <input name="url" placeholder="http://..." />
      </Form.Field>
      <Button type="submit">Save</Button>
    </Form>
  );
};

const mapState = state => ({
  user: state.user
});
const mapDispatch = dispatch => ({
  handleSubmit(evt, userId) {
    evt.preventDefault();
    const mercuryUrl = 'https://mercury.postlight.com/parser?url=' + evt.target.url.value;
    webScraping(mercuryUrl, userId)
    .then(res => dispatch(postContentThunk(res)))

  }
});
export default connect(mapState, mapDispatch)(AddByUrlForm);




