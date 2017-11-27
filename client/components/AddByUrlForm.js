import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, Label, Icon } from 'semantic-ui-react';
import { postContentThunk } from '../store/content';
import { webScraping } from '../utilsScraping';

class AddByUrlForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      urlInput: '',
      saved: 'Save',
      tags: []
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleTags = this.handleTags.bind(this)
    this.deleteTag = this.deleteTag.bind(this)
  }

  handleInput(evt) {
    this.setState({ urlInput: evt.target.value })
  }

  handleTags(evt) {
    if (evt.key === 'Enter') {
      this.setState({ tags: [evt.target.value, ...this.state.tags] })
      evt.target.value = ''
    }
  }

  deleteTag(evt, index) {
    this.setState({
      tags: this.state.tags.filter((el, i) => i !== index)
    })
  }

  render() {
    let tags = this.state.tags;
    return (
      <Form onSubmit={evt => this.props.handleSubmit(evt, this.props.user.id, tags)}>
        <h5>Save an item</h5>
        <Form.Field id="test">
          <label>Enter Url</label>
          <input name="url" placeholder="http://..." onChange={(evt) => this.handleInput(evt)} />
          <Input
            style={{margin: 'auto'}}
            size="medium"
            name="tags"
            icon="tags"
            iconPosition="left"
            placeholder="Enter tags..."
            onKeyPress={evt => this.handleTags(evt)}
          />
          <Label.Group color={this.props.theme}>
            {tags.map((tag, index) => {
              return (
                <Label as="a" key={index}>
                  {tag}
                  <Icon name="close" onClick={(evt) => this.deleteTag(evt, index)} />
                </Label>
              )
            })}
          </Label.Group>
        </Form.Field>
        <Button onClick={(evt) => {this.setState({ saved: 'Saved!' }); this.props.handleSubmit(evt, this.props.user.id, tags, this.state.urlInput)}} color={this.state.urlInput.length > 0 ? 'teal' : ''} type="button" >
          {this.state.saved}
        </Button>
      </Form>
    );
  }
}

const mapState = state => ({
  user: state.user,
  theme: state.theme
});
const mapDispatch = dispatch => ({
  handleSubmit(evt, userId, tags, url) {
    evt.preventDefault();
    let newTags = tags.join(',')
    const mercuryUrl = 'https://mercury.postlight.com/parser?url=' + url;
    webScraping(mercuryUrl, userId, newTags)
      .then(res => dispatch(postContentThunk(res)))
  }
});
export default connect(mapState, mapDispatch)(AddByUrlForm);

