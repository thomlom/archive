<template>
  <div v-if="Object.keys($store.state.stock).length > 0">
    <go-back></go-back>
    <stock-chart :series="series" :title="`${$store.state.stock.quote.symbol} Stock Price for 5 Years`"></stock-chart>
    <stock-statistics :quote="$store.state.stock.quote"></stock-statistics>
    <stock-news-list></stock-news-list>
  </div>
  <no-results v-else></no-results>
</template>

<script>
import GoBack from './GoBack'
import NoResults from './NoResults'
import StockChart from './StockChart'
import StockNewsList from './StockNewsList'
import StockStatistics from './StockStatistics'

export default {
  name: 'stock-detail',
  components: {
    GoBack,
    NoResults,
    StockChart,
    StockNewsList,
    StockStatistics
  },
  props: {
    symbol: String
  },
  mounted () {
    if (Object.keys(this.$store.state.stock).length === 0) {
      this.$store.dispatch('requestStockDetail', this.symbol)
    }
  },
  beforeDestroy () {
    this.$store.commit('setStock', {})
  },
  computed: {
    series () {
      const series = [{
        name: this.$store.state.stock.quote.symbol,
        data: this.$store.state.stock.chart,
        type: 'candlestick'
      }]

      return series
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
