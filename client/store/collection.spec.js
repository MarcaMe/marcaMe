
import {expect} from 'chai'
import { fetchCollections, postCollection } from '../store'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'


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
      const collection = {name: 'An Amazing Collection'}
      mockAxios.onPost('/api/collections').replyOnce(204, collection)
      return store.dispatch(postCollection())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_COLLECTION')
          expect(actions[0].collection).to.be.deep.equal(collection)
        })
    })
  })
})
