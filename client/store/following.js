import axios from 'axios'


const GET_FOLLOWING = 'GET_FOLLOWING';
const DELETE_FOLLOWING = 'DELETE_FOLLOWING';
const ADD_FOLLOWING = 'ADD_FOLLOWING';

const getFollowing = followingArr => ({ type: GET_FOLLOWING, followingArr })
const deleteFollowing = removedId => ({type: DELETE_FOLLOWING, removedId })
const addFollowing = newFollowing => ({type: ADD_FOLLOWING, newFollowing})

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

export const addOneFollowing = (followingId, userId) => 
dispatch => {
  axios.post(`/api/relationship/following/${userId}`, {followingId: followingId} )
  .then(res => res.data)
  .then(newRecord => dispatch(addFollowing(newRecord)))
  .catch(err => console.error(err))
  }

export default function (state = {}, action) {
    switch (action.type) {
      case GET_FOLLOWING:
      return action.followingArr
      case DELETE_FOLLOWING:       
      return state.filter(guy => guy.id !== action.removedId.data )
      case ADD_FOLLOWING: 
      return [...state, action.newFollowing]
      default:
        return state
    }
}
