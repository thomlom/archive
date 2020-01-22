import Vue from 'vue'
import Vuex from 'vuex'

import Storage from '@/utils/Storage'
import Request from '@/utils/Request'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Stock detail
    stock: {},
    // All Stocks
    stocks: [],
    isSearching: false,
    isFetching: false,
    isFetchingSearchResults: false,
    searchResults: [],
    error: null
  },
  mutations: {
    pushStock (state, stock) {
      // Save symbol name to local storage
      state.stocks.push(stock)
      Storage.addSymbol(stock.quote.symbol)
    },
    deleteSymbol (state, index) {
      state.stocks.splice(index, 1)
      Storage.removeSymbol(index)
    },
    toggleSearch (state) { state.isSearching = !state.isSearching },
    /* SETTERS */
    setError (state, error) {
      state.error = error
      setTimeout(() => { state.error = '' }, 6000)
    },
    setFetchingSearchResults (state, status) { state.isFetchingSearchResults = status },
    setFetchingStatus (state, status) { state.isFetching = status },
    setSearchResults (state, results) { state.searchResults = results },
    setStock (state, stock) { state.stock = stock }
  },
  actions: {
    async search ({ commit }, query) {
      commit('setFetchingSearchResults', true)
      try {
        const searchResults = await Request.get(`/stock/search/${query}`)
        commit('setFetchingSearchResults', false)
        commit('setSearchResults', searchResults)
      } catch (err) {}
    },
    async requestStock ({ commit }, symbolInput) {
      commit('setFetchingStatus', true)
      try {
        const stock = await Request.get(`/stock/${symbolInput}`)
        commit('pushStock', stock)
      } catch (err) {
        commit('setError', err.response.data)
      }
      commit('setFetchingStatus', false)
    },
    async requestStockDetail ({ commit }, symbolInput) {
      commit('setFetchingStatus', true)
      try {
        const stock = await Request.get(`/stock/${symbolInput}/detail`)
        commit('setStock', stock)
      } catch (err) {
        commit('setError', err.response.data)
      }
      commit('setFetchingStatus', false)
    }
  }
})
