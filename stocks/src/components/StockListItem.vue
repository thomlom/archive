<template>
  <div class="stock" @click="goToStockDetail">
    <div class="stock__header">
      <img class="stock__logo" :src="quote.logo.url"/>
      <div class="stock__description">
        <p class="stock__title">
          <span>{{ quote.symbol }}</span>
          <!-- Stop event propagation in order to not be redirected to stock detail -->
          <i class="stock__icon fas fa-times" @click.stop="deleteSymbol"></i>
        </p>
        <h5 class="stock__subtitle">{{ quote.companyName }}</h5>
        <p class="stock__percent" :class="percentClass">{{ quote.change }}</p>
      </div>
    </div>
    <div class="stock__details" v-if="more">
      <div class="stock__item" v-for="item in quoteItems" :key="item.name">
        <span class="stock__name">{{ item.name }}</span>
        <span class="stock__value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'stock-list-item',
  props: {
    name: String,
    quote: Object,
    index: Number,
    more: Boolean
  },
  data () {
    return {
      quoteItems: [{
        name: 'Latest price',
        value: this.quote.latestPrice
      }, {
        name: 'Updated date',
        value: this.quote.latestTime
      }, {
        name: 'Open',
        value: this.quote.open
      }, {
        name: 'High',
        value: this.quote.high
      }, {
        name: 'Low',
        value: this.quote.low
      }, {
        name: 'Volume',
        value: this.quote.latestVolume
      }]
    }
  },
  computed: {
    percentClass () {
      return `stock__percent--${(parseFloat(this.quote.change) > 0 ? 'positive' : 'negative')}`
    }
  },
  methods: {
    goToStockDetail () {
      return this.$router.push({ name: 'stock-detail', params: { symbol: this.quote.symbol } })
    },
    deleteSymbol () {
      this.$store.commit('deleteSymbol', this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
.stock {
  border-radius: 0.5rem;
  background-color: var(--color-primary);
  box-shadow: var(--shadow-dark);

  cursor: pointer;

  padding: 1.5rem;

  &__header {
    display: flex;
    align-items: center;
  }

  &__description {
    margin-left: 2rem;
    flex: 1;
  }

  &__logo {
    border-radius: 1rem;
    max-width: 6rem;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-white);
    font-size: var(--title-small);
    font-weight: 700;
  }

  &__subtitle {
    color: var(--color-primary-light);
    font-size: var(--title-smallest);
    font-weight: 700;
  }

  &__icon {
    color: var(--color-white);
    font-size: var(--title-medium);
    cursor: pointer;
    transition: color ease-in-out 0.2s;

    &:hover {
      color: var(--color-secondary);
    }
  }

  &__percent {
    font-size: var(--title-smallest);
    font-weight: 700;

    &--positive {
      color: #24A44C;
    }

    &--negative {
      color: #FC4444;
    }
  }

  &__details {
    margin-top: var(--margin-small);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
  }

  &__item {
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-size: var(--title-smallest);
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-primary-light);
  }

  &__value {
    color: var(--color-white);
    font-size: calc(var(--title-smallest) + 0.2rem);
  }
}
</style>
