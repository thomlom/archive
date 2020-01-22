<template>
  <div class="result" @click="$emit('pushSymbol', result.symbol)">
    <p class="result__symbol">{{ result.symbol }}</p>
    <p class="result__name">{{ result.name}}</p>
  </div>
</template>

<script>
export default {
  name: 'search-results',
  props: {
    result: Object
  }
}
</script>

<style lang="scss" scoped>
.result {
  cursor: pointer;
  background-color: var(--color-primary);
  color: var(--color-white);

  border-bottom: 1px solid var(--color-primary-dark);
  padding: 1.5rem;

  &__symbol {
    font-size: var(--title-small);
  }

  &__name {
    font-size: var(--title-smallest);
    color: var(--color-primary-light);
  }
}
</style>
