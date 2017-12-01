import axios from 'axios';

const GET_FOLLOWER = 'GET_FOLLOWER';

const getFollower = followerArr => ({ type: GET_FOLLOWER, followerArr });

export const fetchFollower = userId => dispatch => {
  axios
    .get(`/api/relationship/follower/${userId}`)
    .then(res => res.data)
    .then(followerArr => dispatch(getFollower(followerArr)))
    .catch(err => console.error(err));
};


export default function(state = [], action) {
  switch (action.type) {
    case GET_FOLLOWER:
      return action.followerArr;
    default:
      return state;
  }
}
