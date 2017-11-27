import axios from 'axios';

const GET_COLLECTION_CONTENT = 'GET_COLLECTION_CONTENT';


const defaultCollection = {}

const getCollectionContent = collection => ({ type: GET_COLLECTION_CONTENT, collection });


export const fetchCollectionContent = (collection) => dispatch => {
  return axios.get(`/api/collections/${collection.id}`)
    .then(res => res.data)
    .then(fetchedcollection => dispatch(getCollectionContent(fetchedcollection)))
    .catch(err => console.error(err));
}

export default function(state = defaultCollection, action) {
  switch (action.type) {
    case GET_COLLECTION_CONTENT:
      return action.collection;
    default:
      return state;
  }
}
