import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header'

it('Should render Header component', () => {
  expect(shallow(<Header />)).toBeDefined()
})
