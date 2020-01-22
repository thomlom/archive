<template>
  <div class="no-results">
    <img class="no-results__image" :src="imageSrc"/>
    <p class="no-results__description">{{ description }}</p>
  </div>
</template>

<script>
import Loading from '@/assets/loading.svg'
import Sad from '@/assets/sad.svg'

export default {
  name: 'no-results',
  computed: {
    imageSrc () {
      return this.$store.state.isFetching ? Loading : Sad
    },
    description () {
      return this.$store.state.isFetching ? 'Loading...' : 'There are no stocks.'
    }
  }
}
</script>

<style lang="scss" scoped>

.no-results {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__image {
    width: 25rem;
  }

  &__description {
    margin-top: 2rem;
    font-size: var(--title-medium);
    font-weight: 700;
    color: var(--color-white);
  }
}
</style>
