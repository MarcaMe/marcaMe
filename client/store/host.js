import axios from 'axios'
import history from '../history'

const GET_HOST = 'GET_HOST'


const getHost = host => ({type: GET_HOST, host})


export const fetchHost = id =>
  dispatch => {
    axios.get(`/api/users/${id}`)
    .then(res => res.data)
    .then(host => dispatch(getHost(host)))
    .catch(err => console.log(err))
}


  export default function (state = {}, action) {
    switch (action.type) {
      case GET_HOST:
        return action.host
      default:
        return state
    }
}
