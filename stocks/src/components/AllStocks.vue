<template>
  <div>
    <search-stock></search-stock>
    <div v-if="$store.state.stocks.length > 0">
      <stock-chart :series="series" title="Stocks Close Price for Two Years"></stock-chart>
      <stock-list ></stock-list>
    </div>
    <no-results v-else></no-results>
    <floating-button></floating-button>
  </div>
</template>

<script>
import FloatingButton from './FloatingButton'
import NoResults from './NoResults'
import SearchStock from './SearchStock'
import StockChart from './StockChart'
import StockList from './StockList'

import Storage from '@/utils/Storage'

export default {
  name: 'all-stocks',
  components: {
    FloatingButton,
    NoResults,
    SearchStock,
    StockChart,
    StockList
  },
  mounted () {
    /*
    The stocks may be cached.
    We don't want to load from localStorage if so
    */
    if (this.$store.state.stocks.length === 0) {
    /* If there are symbols saved in the localStorage, retrieve them and display them */
      let symbols = Storage.getSymbols()
      if (symbols) {
        for (let i = 0; i < symbols.length; i++) {
          const element = symbols[i]
          this.$store.dispatch('requestStock', element)
        }
      }
    }
  },
  computed: {
    series () {
      const series = this.$store.state.stocks.map(element => ({
        name: element.quote.symbol,
        data: element.chart
      }))

      return series
    }
  }
}
</script>
