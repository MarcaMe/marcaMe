import axios from 'axios'

const SEARCH_FRIEND = 'SEARCH_FRIEND';
const GET_ALL_USERS = 'GET_ALL_USERS';

const searchFriend = friend => ({type: SEARCH_FRIEND, friend})
const getAllUsers = users => ({type: GET_ALL_USERS, users})

export const fetchFriend = email =>
  dispatch => {
      axios.get('/api/users')
      .then(res => res.data)
      .then(allUsers => allUsers.filter(user => user.email === email))
      .then(data => dispatch(searchFriend(data)))
      .catch(err => console.error(err))
  }

export const fetchAllUsers = () =>
  dispatch => {
    axios.get('/api/users')
    .then(res => res.data)
    .then(users => dispatch(getAllUsers(users)))
    .catch(err => console.error(err))
  }

export default function (state = [], action) {
  switch (action.type) {
    case SEARCH_FRIEND:
      return action.friend
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}
