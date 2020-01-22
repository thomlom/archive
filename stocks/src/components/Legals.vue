<template>
  <footer class="legals">
    <p class="legals__text">
      <i class="legals__icon fas fa-code"></i>
      <span>
        by <a class="legals__link" href="#">Thomas Lombart</a>.
      </span>
    </p>
    <p class="legals__text">
      Data provided for free by <a class="legals__link" href="https://iextrading.com/developer/">IEX</a>.
      View <a class="legals__link" href="https://iextrading.com/api-exhibit-a/">IEX’s Terms of Use</a>.
    </p>
  </footer>
</template>

<script>
export default {
  name: 'legals'
}
</script>

<style lang="scss" scoped>
.legals {
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: var(--color-primary-dark);
  padding: 1rem;
  font-size: 1.2rem;

  &__text {
    text-align: center;
    width: 95%;
    color: var(--color-white);
  }

  &__link {
    &:link,
    &:visited {
      text-decoration: none;
      font-weight: 700;
      color: var(--color-white);
    }
  }
}
</style>
