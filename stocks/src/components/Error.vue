<template>
  <transition name="pop">
    <div class="error" v-if="$store.state.error">
      <i class="error__icon fas fa-exclamation-triangle"></i>
      <span class="error__text">{{ $store.state.error }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'error'
}
</script>

<style lang="scss" scoped>
.error {
  width: 100%;
  z-index: 5;

  font-size: var(--title-small);
  font-weight: 500;

  background-color: #CE821E;
  color: var(--color-white);

  padding: 1rem;

  &__text {
    margin-left: 1.5rem;
  }
}

.pop-enter-active, .pop-leave-active {
  transition: transform .5s;
}

.pop-enter, .pop-leave-to {
  transform: translateY(-5rem);
}

.pop-enter-to {
  transform: translateY(0px);
}
</style>
