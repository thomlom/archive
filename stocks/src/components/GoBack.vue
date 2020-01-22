<template>
  <button class="go-back" @click="$router.go(-1)">
    <i class="fas fa-arrow-left"></i>
  </button>
</template>

<script>
export default {
  name: 'go-back'
}
</script>

<style lang="scss" scoped>
.go-back {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;

  padding: 0.75rem;

  cursor: pointer;

  background-color: var(--color-secondary);
  border: none;
  color: white;
  font-size: 1.4rem;
  font-weight: 700;

  &:focus {
    outline: none;
  }
}
</style>
