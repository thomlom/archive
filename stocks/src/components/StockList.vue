<template>
  <section title="Stocks">
    <div class="header">
      <h2>Stocks</h2>
      <button class="button" @click="displayMoreOrLess">
        <i class="button__icon fas" :class="this.more ? 'fa-minus-circle' : 'fa-plus-circle'"></i>
        <span class="button__text">{{ this.more ? 'Less' : 'More' }}</span>
      </button>
    </div>
    <transition-group name="list" tag="ul">
      <stock-list-item
        v-for="(stock, index) in stocks"
        :index="index"
        :quote="stock.quote"
        :more="more"
        :key="`${stock.name}-${index}`"
      ></stock-list-item>
    </transition-group>
  </section>
</template>

<script>
import StockListItem from './StockListItem'

export default {
  name: 'stock-list',
  components: {
    StockListItem
  },
  data () {
    return {
      more: false
    }
  },
  computed: {
    stocks () {
      return this.$store.state.stocks
    }
  },
  methods: {
    displayMoreOrLess () {
      this.more = !this.more
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  display: flex;
  align-items: center;

  padding: 0.5rem 1.25rem;

  border: none;
  border-radius: 2rem;

  cursor: pointer;

  box-shadow: var(--shadow-dark);
  background-color: var(--color-secondary);
  color: var(--color-white);

  font-size: 2rem;

  transition: transform 0.1s linear;

  &:active {
    box-shadow: var(--shadow-light);
    transform: translateY(3px);
  }

  &:focus {
    outline: none;
  }

  &__text {
    text-transform: uppercase;
    margin-left: 0.75rem;
    font-weight: 700;
  }
}

ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: var(--margin-medium);
  grid-row-gap: var(--margin-small);

  margin-top: var(--margin-medium);
}

.list-enter-active {
  transition: all 1s;
}
.list-enter {
  opacity: 0;
  transform: translateY(30px);
}
</style>
