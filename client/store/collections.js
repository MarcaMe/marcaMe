import axios from 'axios';
import history from '../history'

const GET_COLLECTIONS = 'GET_COLLECTIONS';
const GET_COLLECTION = 'GET_COLLECTION'
const GET_UPDATED_COLLECTION = 'GET_UPDATED_COLLECTION';
const REMOVE_COLLECTION = 'REMOVE_COLLECTION'

const defaultCollections = [];

const getCollections = collections => ({ type: GET_COLLECTIONS, collections });
const getCollection = collection => ({ type: GET_COLLECTION, collection });
const getUpdatedCollection = collection => ({ type: GET_UPDATED_COLLECTION, collection})
const removeCollection = collection => ({ type: REMOVE_COLLECTION, collection})

export const postCollection = collection => dispatch => {
  return axios
    .post(`/api/collections`, collection)
    .then(res => res.data)
    .then(newCollection => dispatch(getCollection(newCollection)))
    .catch(err => console.error(err));
};

export const editCollection = collection => dispatch => {
  return axios
    .put(`/api/collections/${collection.id}`)
    .then(res => res.data)
    .then(updatedCollection => dispatch(getUpdatedCollection(updatedCollection)))
}

export const fetchCollections = () => dispatch => {
  return axios.get('/api/collections')
    .then(res => res.data)
    .then(collections => dispatch(getCollections(collections)))
    .catch(err => console.error(err));
}

export const deleteCollection = collection => dispatch => {
  return axios.delete(`/api/collections/${collection.id}`)
    .then(res => res.data)
    .then(() => {
      dispatch(removeCollection(collection))
      history.push('/home')
    })
    .catch(err => console.err(err))
}

export const postToCollection = (collection, content) => ({
  type: 'POST_TO_COLLECTION',
  payload: axios.post(`/api/collections/${collection.id}`, content)
});


export default function(state = defaultCollections, action) {
  switch (action.type) {
    case GET_COLLECTION:
      return [...state, action.collection];
    case GET_COLLECTIONS:
      return action.collections;
    case GET_UPDATED_COLLECTION:
      return state.map(collection => (collection.id === action.collection.id ? action.collection.id : collection));
     case REMOVE_COLLECTION:
      return state.filter(collection => collection.id !== action.collection.id);
    default:
      return state;
  }
}
