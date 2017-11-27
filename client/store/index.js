import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import content from './content'
import collections from './collections'
import theme from './theme'
import host from './host'
import searchFriends from './searchFriends'
import following from './following'
import follower from './follower'

const reducer = combineReducers({user, content, collections, theme, host, searchFriends, following, follower})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store

export * from './user';
export * from './content';
export * from './collections';
export * from './theme';
export * from './host';
export * from './searchFriends';
export * from './following';
export * from './follower';
