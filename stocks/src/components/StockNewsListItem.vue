<template>
  <!-- ACCESS TO IMAGES ARE NOT UNAUTHORIZED FOR NOW. WAIT FOR A FIX. -->
  <a class="news" :href="news.url" target="_blank">{{ news.headline }}</a>
</template>

<script>
export default {
  name: 'StockNewsListItem',
  props: {
    news: Object
  }
}
</script>

<style lang="scss" scoped>
.news {
  &:link,
  &:visited {
    text-decoration: none;
    padding: 1.5rem;
    background-color: var(--color-primary);
    color: white;
    font-size: 2rem;
    font-weight: 700;
    border-radius: 0.5rem;
    box-shadow: var(--shadow-dark);
  }

  &:focus {
    outline: none;
  }
}
</style>
