import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { postContentThunk } from '../store/content';

const AddByUrlForm = ({ user, handleSubmit }) => {
  // const user = this.props.user
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
    let type;
    if (
      [
        'youtube.com',
        'vevo.com',
        'vimeo.com',
        'dailymotion.com'
      ].some(videoSite => evt.target.url.value.includes(videoSite))
    ) {
      type = 'video';
    }

    const contentBody = {
      userId,
      type,
      url: evt.target.url.value
    };
    console.log("BODY ", contentBody)
    dispatch(postContentThunk(contentBody));
  }
});
export default connect(mapState, mapDispatch)(AddByUrlForm);
