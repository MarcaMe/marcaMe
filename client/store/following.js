import axios from 'axios'


const GET_FOLLOWING = 'GET_FOLLOWING';
const DELETE_FOLLOWING = 'DELETE_FOLLOWING';

const getFollowing = followingArr => ({ type: GET_FOLLOWING, followingArr })
const deleteFollowing = removedId => ({type: DELETE_FOLLOWING, removedId })


export const fetchFollowing = (userId) =>
dispatch => {
  axios.get(`/api/relationship/following/${userId}`)
  .then(res =>  res.data)
  .then(followingArr => dispatch(getFollowing(followingArr)))
  .catch(err => console.error(err))
}

export const removeFollowing = (userId, followingId) => 
  dispatch => {
    axios({
      method: 'DELETE',
      url: `/api/relationship/following/${userId}`,
      data : { followingId }
    })    
    .then( (followingId) => dispatch(deleteFollowing(followingId)))
    .catch(err => console.error(err))
  }

export default function (state = {}, action) {
    switch (action.type) {
      case GET_FOLLOWING:
      return action.followingArr
      case DELETE_FOLLOWING:       
      const newArr = state.filter(guy => guy.id !== action.removedId.data )
      return newArr
      
      default:
        return state
    }
}
