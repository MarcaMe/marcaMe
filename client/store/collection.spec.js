
import {expect} from 'chai'
import { fetchCollections, postCollection } from '../store'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import collection from './collections'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)


describe('Collection thunk creators', () => {
  let store
  let mockAxios

  const initialState = [];

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchCollections', () => {
    it('eventually dispatches the GET_COLLECTIONS action', () => {
      mockAxios.onGet('/api/collections').replyOnce(200)
      return store.dispatch(fetchCollections())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_COLLECTIONS')
        })
    })
  })

  describe('postCollection', () => {
    it('eventually dispatches the GET_COLLECTION action', () => {
      const newCollection = {name: 'An Amazing Collection'}
      mockAxios.onPost('/api/collections').replyOnce(204, newCollection)
      return store.dispatch(postCollection())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_COLLECTION')
          expect(actions[0].collection).to.be.deep.equal(newCollection)
        })
    })
  })
})

describe('Collection Reducer', () => {
  const initialState = [];
  const testCollections = [ {id: 1, name: 'First Collection'}, {id: 2, name: 'second'} ]
  it('returns the initial state when an empty action object is passed in', () => {
    const action = {};
    expect(collection(initialState, action)).to.be.an('array')
    expect(collection(initialState, action)).to.deep.equal(initialState)
  })
  it('GET_COLLECTION adds a new collection to the current state', () => {
    const action = { type: 'GET_COLLECTION', collection: {id: 1, name: 'Adding a collection'}}
    expect(collection(initialState, action)).to.be.an('array')
    expect(collection(initialState, action).length).to.be.equal(1)
    expect(collection(initialState, action)[0].name).to.be.equal('Adding a collection')
  })
  it('GET_COLLECTIONS when there are multiple collections', () => {
    const action = { type: 'GET_COLLECTIONS', collections: testCollections }
    expect(collection(initialState, action).length).to.be.equal(2)
    expect(collection(initialState, action)[0].name).to.be.equal('First Collection')
    expect(collection(initialState, action)[1].name).to.be.equal('second')
  })
  it('GET_UPDATED_COLLECTION replaces an existing collection with an update', () => {
    const action = { type: 'GET_UPDATED_COLLECTION', collection: {id: 1, name: 'First Edited Collection'} }
    expect(collection(testCollections, action).length).to.be.equal(2)
    expect(collection(testCollections, action)[0].id).to.be.equal(action.collection.id)
    expect(collection(testCollections, action)[0].name).to.be.equal(action.collection.name)
  })
  it('REMOVE_COLLECTION', () => {
    const action = { type: 'REMOVE_COLLECTION', collection: {id: 2, name: 'second'} }
    expect(collection(testCollections, action).length).to.be.equal(1)
    expect(collection(testCollections, action).filter(stateCollection => stateCollection.id === 2).length).to.be.equal(0)
  })
})
