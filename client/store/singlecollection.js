import axios from 'axios';

const GET_COLLECTION_CONTENT = 'GET_COLLECTION_CONTENT';
const REMOVE_FROM_COLLECTION = 'REMOVE_FROM_COLLECTION';


const defaultCollection = {}

const getCollectionContent = collection => ({ type: GET_COLLECTION_CONTENT, collection });
const removeFromCollection = (collection, content) => ({ type: REMOVE_FROM_COLLECTION, collection, content})


export const fetchCollectionContent = (collection) => dispatch => {
  return axios.get(`/api/collections/${collection.id}`)
    .then(res => res.data)
    .then(fetchedcollection => dispatch(getCollectionContent(fetchedcollection)))
    .catch(err => console.error(err));
}


export const postRemoveFromCollection = (collection, content) => dispatch => {
  return axios.put(`/api/collections/${collection.id}/${content.id}`)
    .then(res => res.data)
    .then(_ => dispatch(removeFromCollection(collection, content)))
    .catch(err => console.error(err));
}

export default function(state = defaultCollection, action) {
  switch (action.type) {
    case GET_COLLECTION_CONTENT:
      return action.collection;
     case REMOVE_FROM_COLLECTION:
      return {...action.collection, contents: action.collection.contents.filter(content => content.id !== action.content.id)};
    default:
      return state;
  }
}
