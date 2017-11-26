import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input } from 'semantic-ui-react';
import { postContentThunk } from '../store/content';
import { webScraping } from '../utilsScraping';

class AddByUrlForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      urlInput: '',
      saved: 'Save',
      tags: ''
    }
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(evt) {
    this.setState({ urlInput: evt.target.value })
  }

  handleTags(evt) {
    this.setState({ tags: evt.target.value })
  }

  render() {
    return (
      <Form onSubmit={evt => this.props.handleSubmit(evt, this.props.user.id, this.state.tags)}>
        <h5>Save an item</h5>
        <Form.Field>
          <label>Enter Url</label>
          <input name="url" placeholder="http://..." onChange={(evt) => this.handleInput(evt)} />
          <Input
            name="tags"
            icon="tags"
            iconPosition="left"
            label={{ tag: true, content: 'Add Tag' }}
            labelPosition="right"
            placeholder="tag1, tag2"
            onChange={(evt) => this.handleTags(evt)}
          />
        </Form.Field>
        <Button onClick={() => this.setState({ saved: 'Saved!' })} color={this.state.urlInput.length > 0 ? 'teal' : ''} type="submit">
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
  handleSubmit(evt, userId, tags) {
    evt.preventDefault();
    const mercuryUrl = 'https://mercury.postlight.com/parser?url=' + evt.target.url.value;
    webScraping(mercuryUrl, userId, tags)
      .then(res => dispatch(postContentThunk(res)))

  }
});
export default connect(mapState, mapDispatch)(AddByUrlForm);

