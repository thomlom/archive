export const BASE_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}`

class SearchBuilder {
  constructor() {
    this.url = BASE_URL
  }

  title(title) {
    this.url += `&s=${title}`
    return this
  }

}

export default SearchBuilder