import axios from 'axios'
import history from '../history'


const GET_FOLLOWING = 'GET_FOLLOWING';

const getFollowing = followingArr => ({ type: GET_FOLLOWING, followingArr })

export const fetchFollowing = (userId) =>
dispatch => {
  axios.get(`/api/relationship/following/${userId}`)
  .then(res =>  res.data)
  .then(followingArr => dispatch(getFollowing(followingArr)))
  .catch(err => console.error(err))
}

export default function (state = {}, action) {
    switch (action.type) {
      case GET_FOLLOWING:
      return action.followingArr
      default:
        return state
    }
}
