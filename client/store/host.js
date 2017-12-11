import axios from 'axios'

const GET_HOST = 'GET_HOST'
const UPDATE_HOST_NAME = 'UPDATE_HOST_NAME'


const getHost = host => ({type: GET_HOST, host})
const updateHostName = host => ({type: UPDATE_HOST_NAME, host})


export const fetchHost = id =>
  dispatch => {
    axios.get(`/api/users/${id}`)
    .then(res => res.data)
    .then(host => dispatch(getHost(host)))
    .catch(err => console.log(err))
}
export const updateOneHostName = (userId, newName) =>
dispatch => {
  return axios.put('/auth/me', {userId, newName })
  .then(res => res.data)
  .then(updatedUser => dispatch(updateHostName(updatedUser)))
  .catch(err => console.log(err))
}

  export default function (state = {}, action) {
    switch (action.type) {
      case GET_HOST:
        return action.host
        case UPDATE_HOST_NAME:
        return action.host
      default:
        return state
    }
}
