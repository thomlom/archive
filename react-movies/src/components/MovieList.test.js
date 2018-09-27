import React from 'react'
import { shallow } from 'enzyme'
import MovieList from './MovieList'
import Movie from './Movie';

it('Should render MovieList component', () => {
  expect(shallow(<MovieList movies={['foo', 'bar']}/>)).toBeDefined()
})

it('Should have as many Movie components as there are movies', () => {
  let component = shallow(<MovieList movies={['foo', 'bar']} />)
  expect(component.find(Movie).length).toEqual(component.instance().props.movies.length)

  component.setProps({
    movies: [1, 2, 3, 4, 5]
  })
  expect(component.find(Movie).length).toEqual(component.instance().props.movies.length)
})