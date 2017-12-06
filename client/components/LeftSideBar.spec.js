/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { LeftSideBar }  from './LeftSideBar'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('ContentCard', () => {
  let leftSideBar

  beforeEach(() => {

    leftSideBar = shallow(<LeftSideBar collections={[]} getUserCollections={() => {}} addCollection={() => {}} />)
  })

  it('to have a div with id sidebar', () => {
    expect(leftSideBar.find('#sidebar')).to.have.length(1)
    expect(leftSideBar.find('#sidebar').props().id).to.be.equal('sidebar')
  })

  it('to render a div with className collection', () => {
    expect(leftSideBar.find('.collection')).to.have.length(1)
    expect(leftSideBar.find('.collection').props().className).to.be.equal('collection')
  })
})
