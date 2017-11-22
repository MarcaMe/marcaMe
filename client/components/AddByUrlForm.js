import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { postContentThunk } from '../store/content';
import { webScraping } from '../utilsScraping';

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
        <Button onClick={() => this.setState({saved: 'Saved!'})} color={this.state.urlInput.length > 0 ? 'teal' : ''} type="submit">
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
    const mercuryUrl = 'https://mercury.postlight.com/parser?url=' + evt.target.url.value;
    webScraping(mercuryUrl, userId)
    .then(res => dispatch(postContentThunk(res)))

  }
});
export default connect(mapState, mapDispatch)(AddByUrlForm);

