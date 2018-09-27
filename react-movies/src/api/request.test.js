import request from './request'
import axios from 'axios'

jest.mock('axios')

it('Should return data if request status is 200', () => {
  const response = { status: 200, data: 'hello world' }
  axios.get.mockImplementation(() => Promise.resolve(response))
  /*
  We don't care of what URL we give to the request library as we're mocking axios
  In fact, what we want to test is what happens once the data have been fetched
  */
  request('some_url').then(data => {
    expect(data).toEqual('hello world')
  })
})

it('Should throw an error if request status is different then 200', () => {
  const response = { status: 500 }
  axios.get.mockImplementation(() => Promise.resolve(response))


  request('some_url').catch(err => {
    expect(err.message).toEqual('Something wrong happened.')
  })
})