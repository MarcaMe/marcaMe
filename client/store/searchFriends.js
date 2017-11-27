import axios from 'axios'
import history from '../history'

const SEARCH_FRIEND = 'SEARCH_FRIEND';
const FOLLOW_A_FRIEND = 'FOLLOW_A_FRIEND';

const searchFriend = friend => ({type: SEARCH_FRIEND, friend})
const followAFriend = () => ({type: FOLLOW_A_FRIEND })


export const fetchFriend = email =>
    dispatch => {
        axios.get('/api/users')
        .then(res => res.data)
        .then(allUsers => allUsers.filter(user => user.email === email))
        .then(data => dispatch(searchFriend(data)))
        .catch(err => console.error(err))
    }

export const followFriend = (followedId, userId) =>
  dispatch => {
    axios.post(`/api/relationship/${userId}`, {followedId: followedId} )
    .then(res => res.data)
    .then(newRecord =>  dispatch(followAFriend()))
    .catch(err => console.error(err))
  }

export default function (state = {}, action) {
  switch (action.type) {
    case SEARCH_FRIEND:
      return action.friend
    case FOLLOW_A_FRIEND:
    return state

    default:
      return state
  }
}
