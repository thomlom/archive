import React from 'react'
import { shallow, mount } from 'enzyme'
import Movie from './Movie'

it('Should render Movie component', () => {
  expect(shallow(<Movie movie={{ Title: 'test' }} />)).toBeDefined()
})

it('Should redirect to IMDB movie by clicking on more', () => {
  let component = mount(<Movie movie={{ Title: 'test', imdbID: '1', Year: '2018' }} />)
  let link = component.find('a')
  expect(link.instance().href).toBe('https://www.imdb.com/title/1')
})
