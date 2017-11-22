import axios from 'axios';

const ADD_CONTENT = 'ADD_CONTENT';
const GET_SINGLE_CONTENT = 'GET_SINGLE_CONTENT';

const defaultContent = [];

const addContent = content => ({ type: ADD_CONTENT, content });
const getContent = content => ({ type: GET_SINGLE_CONTENT, content });

export const postContentThunk = contentBody => dispatch => {
  axios
    .post(`/api/contents`, contentBody)
    .then(content => dispatch(addContent(content)))
    .catch(err => console.error(err));
};

export const getSingleContent = contentId => dispatch => {
  axios.get(`/api/contents/${contentId}`)
  .then(res => res.data)
  .then(content => dispatch(getContent(content)))
  .catch(err => console.error(err));
}


export default function(state = defaultContent, action) {
  switch (action.type) {
    case ADD_CONTENT:
      return action.content;
    case GET_SINGLE_CONTENT:
      return [ action.content ];
    default:
      return state;
  }
}
