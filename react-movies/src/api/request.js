import axios from 'axios'

const request = (search) => {
  return axios.get(search).then(({ status, data }) => {
    if (status === 200) {
      return data
    }

    throw new Error('Something wrong happened.')
  })
}

export default request