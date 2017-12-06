
import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import { fetchCollectionContent } from '../store'
import singlecollection from './singlecollection'


const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)


describe('SingleCollection thunk creators', () => {
  let store
  let mockAxios
  let collection

  const initialState = {};

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchCollectionContent', () => {
    collection = {id: 1, name: 'An Amazing Collection'}
    it('eventually dispatches the GET_COLLECTION_CONTENT action', () => {
      mockAxios.onGet('/api/collections/1').replyOnce(200)
      return store.dispatch(fetchCollectionContent(collection))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_COLLECTION_CONTENT')
        })
    })
  })
})


describe('Single Collection reducer', () => {
  const initialState = {}
  const collection = {id: 1, name: 'An amazing collection', contents: [{id: 1, title: 'Some Article' }]}
  const action = {type: 'GET_COLLECTION_CONTENT', collection}
  it('should return the initial state when ', () => {
    expect(singlecollection(initialState, {})).to.equal(initialState)
  })
  it('should return a new object with a passed in collection\'s props', () => {
    expect(singlecollection(initialState, action)).to.be.an('object')
    expect(singlecollection(initialState, action).id).to.equal(1)
    expect(singlecollection(initialState, action).name).to.equal('An amazing collection')
  })
  it('should remove content when the action type is REMOVE_FROM_COLLECTION', () => {
    const removeAction = {type: 'REMOVE_FROM_COLLECTION', collection, content: {id: 1, title: 'Some Article' }}
    expect(singlecollection(initialState, removeAction).contents.length).to.equal(0)
    expect(singlecollection(initialState, removeAction).id).to.equal(1)
  })

})
