import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import MovieList from './MovieList';
import Search from './Search'

it('Should render App component and children', () => {
  let component = shallow(<App />)
  expect(component).toBeDefined()
  let movies = component.state().movies
  expect(movies).toEqual([])

  let search = component.find(Search)
  expect(search.length).toEqual(1)
  expect(search.props().updateMovies).toBe(component.instance().updateMovies)

  let movieList = component.find(MovieList)
  expect(movieList.length).toEqual(1)
  expect(movieList.props().movies).toEqual(movies)
})

it('Should update movies and set a new state', () => {
  let component = shallow(<App />)
  const updateMovies = component.instance().updateMovies
  expect(component.state().movies).toEqual([])
  let newMovies = ['foo', 'bar', 'test']
  updateMovies(newMovies)
  expect(component.state().movies).toEqual(newMovies)
})
