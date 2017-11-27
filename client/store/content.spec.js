
import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import { fetchAllContent, postContentThunk } from '../store'


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

  describe('fetchContent', () => {
    it('eventually dispatches the GET_ALL_CONTENT action', () => {
      mockAxios.onGet('/api/contents').replyOnce(200)
      return store.dispatch(fetchAllContent())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_ALL_CONTENT')
        })
    })
  })
})
