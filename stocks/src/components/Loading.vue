<template>
  <div class="outer-dot">
    <div class="inner-dot"></div>
  </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style lang="scss" scoped>
.outer-dot {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem;
  border-radius: 50%;

  background-color: var(--color-primary-light);

  animation-name: grow;
  animation-duration: 0.4s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.inner-dot {
  width: 1.75rem;
  height: 1.75rem;
  background-color: var(--color-secondary);
  border-radius: 50%;
}

@keyframes grow {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}
</style>
