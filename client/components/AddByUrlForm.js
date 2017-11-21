import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { postContentThunk } from '../store/content';



class AddByUrlForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      urlInput: '',
      saved: 'Save'
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(evt) {
    this.setState({urlInput: evt.target.value})
  }

  render() {
    return (
      <Form onSubmit={evt => this.props.handleSubmit(evt, this.props.user.id)}>
        <h5>Save an item</h5>
        <Form.Field>
          <label>Enter Url</label>
          <input name="url" placeholder="http://..." onChange={(evt) => this.handleInput(evt)} />
        </Form.Field>
        <Button onClick={() => this.setState({saved: 'Saved!'})}color={this.state.urlInput.length > 0 ? 'teal' : ''} type="submit">
        {this.state.saved}
        </Button>
      </Form>
    );
  }
}

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
    } else if (
      [
        'nytimes.com',
        'medium.com',
        'washingtonpost.com',
        'hbr.org',
        'scotch.io'
      ].some(articleSite => evt.target.url.value.includes(articleSite))
    ) {
      type = 'article';
    }

    const contentBody = {
      userId,
      type,
      url: evt.target.url.value
    };
    dispatch(postContentThunk(contentBody));
  }
});
export default connect(mapState, mapDispatch)(AddByUrlForm);
