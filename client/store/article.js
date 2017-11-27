import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ARTICLE = 'GET_ARTICLE';

/**
 * INITIAL STATE
 */
const article = {}

/**
 * ACTION CREATORS
 */
const getArticle = article => ({type: GET_ARTICLE, article});

/**
 * THUNK CREATORS
 */
export const fetchOneArticle = () => {
    return function thunk (dispatch) {
        axios.get('/api/scrape/articleScraping')
          .then(res => dispatch(getArticle(res.data)))
          .catch(err => console.log(err))
    }
}


/**
 * REDUCER
 */
export default function (state = article, action) {
  switch (action.type) {
    case GET_ARTICLE:
      return action.article

    default:
      return state
  }
}
