import React from 'react'
import { mount } from 'enzyme'
import Search from './Search'
import request from '../api/request'
import search from '../api/SearchBuilder'

let component
let updateMoviesMock = jest.fn()

beforeEach(() => {
  component = mount(<Search updateMovies={updateMoviesMock} />)
})

it('Should render Search component', () => {
  expect(component).toBeDefined()
})

it('Should change input state when typing on input field', () => {
  expect(component.state().title).toEqual('')
  const input = component.find('input')
  input.simulate('change', { target: { value: 'gladiator' } })
  expect(component.state().title).toEqual('gladiator')
})

jest.mock('../api/request')

const mockTitle = jest.fn();
jest.mock('../api/SearchBuilder', () => {
  return jest.fn().mockImplementation(() => {
    return {
      url: 'some_url',
      title: mockTitle
    }
  })
})

// Async & Await are really necessary because otherwise updateMoviesMock won't be called !
it('Should make a request and update movies when pressing on enter', async () => {
  request.mockImplementationOnce(() => Promise.resolve({ Response: "True", Search: ['foo', 'bar'] }))
  const input = component.find('input')
  await input.simulate('keypress', { key: 'Enter' })
  expect(search).toHaveBeenCalledTimes(1)
  expect(mockTitle).toHaveBeenCalledWith(component.state().title)
  expect(request).toHaveBeenCalledWith('some_url')
  expect(updateMoviesMock).toHaveBeenCalledWith(['foo', 'bar']) // USe variable
})


it.skip('Should not call updateMovies if response from the request is not True', async () => {
  // Clear first updateMoviesMock because of the test before
  updateMoviesMock.mockClear()

  request.mockImplementationOnce(() => Promise.resolve({ Response: "False" }))
  const input = component.find('input')
  await input.simulate('keypress', { key: 'Enter' })
  expect(updateMoviesMock).not.toHaveBeenCalled()
})