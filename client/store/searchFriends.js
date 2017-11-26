import axios from 'axios'
import history from '../history'

const SEARCH_FRIEND = 'SEARCH_FRIEND';

const searchFriend = friend => ({type: SEARCH_FRIEND, friend})

export const fetchFriend = email => 
    dispatch => {
        axios.get('/api/users')
        .then(res => res.data)
        .then(allUsers => allUsers.filter(user => user.email === email))
        .then(data => dispatch(searchFriend(data)))
        .catch(err => console.error(err))
    }

export default function (state = {}, action) {
        switch (action.type) {
          case SEARCH_FRIEND:
            return action.friend
          default:
            return state
        }
      }