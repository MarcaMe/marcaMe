/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { ContentHome }  from './ContentHome'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('ContentHome', () => {
  let contentHome

  beforeEach(() => {

    contentHome = shallow(<ContentHome user={{}} content={[]} fetchAllContentofUser={() => {}} deleteSingleContent={() => {}} />)
  })

  it('is a div with id main-page', () => {
    expect(contentHome.is('div')).to.be.equal(true)
    expect(contentHome.find('div').first().props().id).to.equal('main-page')
  })

  it('renders two children- a connected <LeftSideBar /> and a div with id content-home', () => {
    const mainPageChildren = contentHome.props().children
    expect(mainPageChildren).to.have.length(2)
    expect(mainPageChildren[0].type.displayName).to.equal('withRouter(Connect(LeftSideBar))')
    expect(mainPageChildren[1].props.id).to.equal('content-home')
  })
})
