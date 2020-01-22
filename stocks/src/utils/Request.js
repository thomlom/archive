import axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://powerful-crag-33136.herokuapp.com'

class Request {
  static async get (url) {
    let response = await axios.get(`${BASE_URL}${url}`)
    return response.data
  }
}

export default Request
