import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';
import { editOneContent, deleteOneContent, fetchFollowing } from '../store';
import { DisplayFriends } from '../components'


class GeneralCardIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.story.isFavorite,
      isArchived: this.props.story.isArchived,
      isPublic: this.props.story.isPublic,
      displayFriends: false,
      friendsArr: [],
    };
    this._handleEditClick = this._handleEditClick.bind(this);
    this.shareArticle = this.shareArticle.bind(this);
    this.findFriends = this.findFriends.bind(this);
  }

  componentWillMount() {
    const userId = this.props.user.id;
    this.props.getFollowing(userId);
  }
  _handleEditClick(evt, fieldName) {
    evt.preventDefault();
    this.setState({ [fieldName]: !this.state[fieldName] }, () =>
      this.props.editContent(
        this.props.story.id,
        fieldName,
        this.state[fieldName]
      )
    );
  }

   findFriends(arr, userId) {
    const rtnArr = [];
    for (let i = 0; i < arr.length; i++){
      for (let j = i + 1; j < arr.length; j++){
        if (arr[i].followed === arr[j].userId && arr[j].followed === arr[i].userId){
          rtnArr.push(arr[i]);
          rtnArr.push(arr[j])
        }
      }
    }
    return rtnArr.filter(ele => ele.userId !== userId )
  }


    shareArticle(evt, userId) {
     evt.preventDefault()
      axios.get('/api/relationship')
      .then(res => res.data)
      .then(followArr => this.findFriends(followArr, userId))
      .then(data => this.setState({friendsArr: data, displayFriends: true}))
      .catch(err => console.error(err))
   }


  render() {
    return (
      <div>
        <Icon size="large" name="tags" />
        <Icon
          id="unlock-icon"
          size="large"
          name="unlock"
          onClick={evt => this._handleEditClick(evt, 'isPublic')}
          color={this.state.isPublic ? 'blue' : ''}
        />
        <Icon
            id="archive-icon"
            name="archive"
            size="large"
            color={this.state.isArchived ? 'teal' : ''}
            onClick={evt => this._handleEditClick(evt, 'isArchived')}
          />
        <Icon
          id="heart-icon"
          name="heart"
          size="large"
          color={this.state.isFavorite ? 'red' : ''}
          onClick={evt => this._handleEditClick(evt, 'isFavorite')}
        />
        <Icon
          id="trash-icon"
          size="large"
          name="trash"
          onClick={evt => this.props.deleteContent(evt, this.props.story.id)}
        />
        <Icon
        id="send-icon"
        size="large"
        name="send"
        onClick={evt => this.shareArticle(evt, this.props.id)}
      />
      {this.state.displayFriends ? <DisplayFriends friendsArr={this.state.friendsArr} storyId={this.props.story.id} /> : null}
      </div>
    );
  }
}
const mapState = state => ({
  article: state.content,
  singlecollection: state.singlecollection,
  user: state.user
});

const mapDispatch = dispatch => {
  return {
    editContent(id, field, value) {
      const contentBody = { id, [field]: value };
      dispatch(editOneContent(contentBody));
    },
    deleteContent(evt, contentId) {
      evt.preventDefault();
      dispatch(deleteOneContent(contentId));
    },
    getFollowing(id) {
      dispatch(fetchFollowing(id));
    }
}
}

export default connect(mapState, mapDispatch)(GeneralCardIcons);
