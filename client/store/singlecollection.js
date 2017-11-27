import axios from 'axios';

const GET_COLLECTION_CONTENT = 'GET_COLLECTION_CONTENT';


const defaultCollection = {}

const getCollectionContent = content => ({ type: GET_COLLECTION_CONTENT, content });

// export const postCollection = collection => dispatch => {
//   return axios
//     .post(`/api/collections`, collection)
//     .then(res => res.data)
//     .then(newCollection => dispatch(getCollection(newCollection)))
//     .catch(err => console.error(err));
// };

// export const editCollection = collection => dispatch => {
//   return axios
//     .put(`/api/collections/${collection.id}`)
//     .then(res => res.data)
//     .then(updatedCollection => dispatch(getUpdatedCollection(updatedCollection)))
// }

export const fetchCollectionContent = (collection) => dispatch => {
  return axios.get(`/api/collections/${collection.id}`)
    .then(res => res.data)
    .then(collection => dispatch(getCollectionContent(collection)))
    .catch(err => console.error(err));
}

// export const deleteCollection = collection => dispatch => {
//   return axios.delete(`/api/collections/${collection.id}`)
//     .then(res => res.data)
//     .then(() => dispatch(removeCollection(collection)))
//     .catch(err => console.err(err))
// }

// export const postToCollection = (collection, content) => {
//   return axios.post(`/api/collections/${collection.id}`, content)
// }

export default function(state = defaultCollection, action) {
  switch (action.type) {
    case GET_COLLECTION_CONTENT:
      return action.content;
    default:
      return state;
  }
}
