import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import { fetchAllContent } from '../store'
import content from './content'

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


describe('Content Reducer', () => {
  const initialState = [];
  const someContent = [ {id: 1, title: 'Some Title'}, {id: 2, title: 'A different title'} ]
  it('returns initial state when an empty action is passed in', () => {
    expect(content(initialState, {})).to.deep.equal(initialState)
  })
  it('should return an array of contents when an action with type GET_ALL_CONTENT', () => {
    const action = { type: 'GET_ALL_CONTENT', content: someContent }
    expect(content(initialState, action)).to.be.an('array')
    expect(content(initialState, action)).to.have.length(2)
  })
  it('should add an empty object when type is ADD_BLANK_CONTENT', () => {
    const action = { type: 'ADD_BLANK_CONTENT'}
    expect(content(initialState, action).length).to.equal(1)
    expect(content(initialState, action)[0]).to.be.an('object')
    expect(Object.keys(content(initialState, action)[0]).length).to.equal(0)
  })
  it('should add content when type is ADD_CONTENT but only after adding ADD_BLANK_CONTENT', () => {
    const action = { type: 'ADD_CONTENT', content: { id: 3, title: 'Adding Content' }}
    const blankContentAdded = content(initialState, { type: 'ADD_BLANK_CONTENT'})
    expect(content(initialState, action).length).to.equal(0)
    expect(content(blankContentAdded, action).length).to.equal(1)
    expect(content(blankContentAdded, action)[0].id).to.equal(3)
    expect(content(blankContentAdded, action)[0].title).to.equal('Adding Content')
  })
  it('should delete content when type is DELETE_SINGLE_CONTENT', () => {
    const currentState = [ {id: 5, title: 'Deleting Content'}]
    const action = { type: 'DELETE_SINGLE_CONTENT', contentId: 5}
    expect(content(currentState, action).length).to.equal(0)
  })
  it('should edit content', () => {
    const currentState = [ {id: 5, title: 'EDIT THIS CONTENT'} ]
    const action = { type: 'EDIT_SINGLE_CONTENT', content: {id: 5, title: 'Edited Content'}}
    expect(content(currentState, action)[0].id).to.equal(currentState[0].id)
    expect(content(currentState, action)[0].title).to.equal(action.content.title)
  })
})
