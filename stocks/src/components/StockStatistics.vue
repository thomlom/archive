<template>
  <section class="statistics">
    <h2>{{ quote.symbol }}</h2>
    <h3 class="statistics__name">{{ quote.companyName }}</h3>
    <div class="statistics__details">
      <div class="statistics__item" v-for="item in quoteItems" :key="item.name">
        <span class="statistics__name">{{ item.name }}</span>
        <span class="statistics__value">{{ item.value }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'statistics',
  props: {
    quote: Object
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
  }
}
</script>

<style lang="scss" scoped>
.statistics {
  &__name {
    font-size: var(--title-medium);
    color: var(--color-primary-light);
  }

  &__details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    margin-top: var(--margin-medium);
  }

  &__item {
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-size: var(--title-small);
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-primary-light);
  }

  &__value {
    color: var(--color-white);
    font-size: calc(var(--title-small) + 0.2rem);
  }
}
</style>
