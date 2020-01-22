<template>
  <button class="floating-button" @click="toggleSearch">
    <i class="floating-button__icon fas fa-plus"></i>
  </button>
</template>

<script>
export default {
  name: 'floating-button',
  methods: {
    toggleSearch () {
      this.$store.commit('toggleSearch')
    },
    async addStock () {
      // Clear the input after the search
      this.$store.dispatch('requestStock', this.symbol)
    }
  }
}
</script>

<style lang="scss" scoped>
.floating-button {
  position: fixed;
  bottom: 3rem;
  right: 2rem;

  padding: 1.25rem;

  border: none;
  border-radius: 50%;

  box-shadow: var(--shadow-dark);
  background-color: var(--color-secondary);
  color: var(--color-white);

  cursor: pointer;

  transition: all ease-in-out 0.3s;

  &__icon {
    font-size: 2.5rem;
  }

  &:active {
    transform: translateY(3px);
  }
}
</style>
