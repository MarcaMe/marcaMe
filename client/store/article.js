import axios from 'axios'

const GET_ARTICLE = 'GET_ARTICLE';

const defaultArticle = {}

const getArticle = article => ({type: GET_ARTICLE, article});


export const fetchOneArticle = () => {
    return function thunk (dispatch) {
        axios.get('/api/scrape/articleScraping')
          .then(res => dispatch(getArticle(res.data)))
          .catch(err => console.log(err))
    }
}


export default function (state = defaultArticle, action) {
  switch (action.type) {
    case GET_ARTICLE:
      return action.article
    default:
      return state
  }
}
