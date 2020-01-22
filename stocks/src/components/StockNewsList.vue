<template>
  <section>
    <h2>News</h2>
    <div class="grid">
      <stock-news-list-item
        v-for="(news, index) in $store.state.stock.news"
        :news="news"
        :key="index"
      ></stock-news-list-item>
    </div>
  </section>
</template>

<script>
import StockNewsListItem from './StockNewsListItem'

export default {
  name: 'stock-news-list',
  components: {
    StockNewsListItem
  }
}
</script>

<style lang="scss" scoped>
.grid {
  margin-top: var(--margin-medium);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  grid-column-gap: var(--margin-medium);
  grid-row-gap: var(--margin-medium);
}
</style>
