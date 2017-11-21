import axios from 'axios';

const POST_CONTENT = 'POST_CONTENT';

const defaultContent = [];

const postContent = content => ({ type: POST_CONTENT, content });

export const postContentThunk = contentBody => dispatch =>
  axios
    .post('/api/scrape/videoScraping/', contentBody)
    .then(content => {
      dispatch(postContent(content));
    })
    .catch(err => console.error(err));

export default function(state = defaultContent, action) {
  switch (action.type) {
    case POST_CONTENT:
      return action.content;
    default:
      return state;
  }
}
