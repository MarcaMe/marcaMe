import axios from 'axios';
import history from '../history';

const GET_ALL_CONTENT = 'GET_ALL_CONTENT';
const ADD_CONTENT = 'ADD_CONTENT';
const GET_SINGLE_CONTENT = 'GET_SINGLE_CONTENT';
const DELETE_SINGLE_CONTENT = 'DELETE_SINGLE_CONTENT';
const EDIT_SINGLE_CONTENT = 'EDIT_SINGLE_CONTENT';

const defaultContent = [];

const addContent = content => ({ type: ADD_CONTENT, content });
const getContent = content => ({ type: GET_SINGLE_CONTENT, content });
const getAllContent = content => ({ type: GET_ALL_CONTENT, content });
const deleteSingleContent = contentId => ({
  type: DELETE_SINGLE_CONTENT,
  contentId
});
const editSingleContent = content => ({ type: EDIT_SINGLE_CONTENT, content });

export const fetchAllContent = () => dispatch => {
  axios
    .get('/api/contents')
    .then(res => res.data)
    .then(content => dispatch(getAllContent(content)))
    .catch(err => console.error(err));
};

export const postContentThunk = contentBody => dispatch => {
  axios
    .post(`/api/contents`, contentBody)
    .then(res => res.data)
    .then(content => dispatch(addContent(content)))
    .catch(err => console.error(err));
};

export const getSingleContent = contentId => dispatch => {
  axios
    .get(`/api/contents/${contentId}`)
    .then(res => res.data)
    .then(content => dispatch(getContent(content)))
    .catch(err => console.error(err));
};

export const deleteOneContent = contentId => dispatch => {
  dispatch(deleteSingleContent(contentId));
  axios.delete(`/api/contents/${contentId}`)
  .then(_ => history.push('/home'))
  .catch(err => console.error(err));
};

export const editOneContent = contentBody => dispatch => {
  console.log(contentBody)
  axios
    .put(`/api/contents/${contentBody.id}`, contentBody)
    .then(res => res.data)
    .then(content => dispatch(editSingleContent(content)))
    .catch(err => console.error(err));
};

export default function(state = defaultContent, action) {
  switch (action.type) {
    case GET_ALL_CONTENT:
      return action.content;
    case ADD_CONTENT:
      return [action.content, ...state];
    case GET_SINGLE_CONTENT:
      return [action.content];
    case EDIT_SINGLE_CONTENT:
      return state.map(content => (content.id === action.content.id ? action.content : content));
    case DELETE_SINGLE_CONTENT:
      return state.filter(content => +content.id !== +action.contentId);
    default:
      return state;
  }
}
