<template>
  <div class="overlay" v-if="$store.state.isSearching" @click.stop="toggleSearch">
    <div class="search">
      <input class="search__input" v-focus placeholder="Search for stocks" v-model="query" @keyup="search"/>
      <loading class="loading" v-if="$store.state.isFetchingSearchResults"></loading>
    </div>
    <search-result
      v-for="(result, index) in $store.state.searchResults"
      :result="result"
      :key="`${result.symbol}-${index}`"
      @pushSymbol="pushSymbol"
    >{{result.symbol}}</search-result>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import SearchResult from './SearchResult'
import Loading from './Loading'

export default {
  name: 'search-stock',
  data () {
    return {
      query: ''
    }
  },
  components: {
    Loading,
    SearchResult
  },
  directives: {
    /* Focus on the input element as soon as the user searches a stock symbol */
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    toggleSearch (e) {
      /*
      Toggle the search only if the user clicks on the overlay
      It prevents the search to disappear if the user clicks on the search bar
      */
      if (e.target.className === 'overlay') {
        this.$store.commit('toggleSearch')
      }
    },
    /* Avoid sending too many requests while the user is searching */
    search: debounce(function () {
      if (this.query !== '') {
        return this.$store.dispatch('search', this.query)
      }
      return this.$store.commit('setSearchResults', [])
    }, 500),
    pushSymbol (symbol) {
      /* Reset the search results and the query for the future searches */
      this.$store.commit('toggleSearch')
      this.$store.commit('setSearchResults', [])
      this.query = ''

      /* We make sure we don't add any duplicates to our stocks array */
      if (this.$store.state.stocks.findIndex(stock => stock.quote.symbol === symbol) !== -1) {
        return this.$store.commit('setError', 'You already added this stock symbol.')
      }

      this.$store.dispatch('requestStock', symbol)
    }
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  display: block;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.8);
  z-index: 2;
}

.loading {
  margin-right: 2rem;
}

.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1.5rem;

  box-shadow: var(--shadow-dark);
  background-color: var(--color-primary-dark);

  &__input {
    width: 80%;
    padding: 1rem 0;

    font-size: var(--title-medium);
    font-family: inherit;
    font-weight: 700;

    border: none;

    background-color: transparent;
    color: var(--color-white);

    &:focus {
      outline: none;
    }
  }
}
</style>
