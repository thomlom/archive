<template>
  <div class="apply-background" :class="{'no-scroll': $store.state.isSearching}">
    <error></error>
    <loading v-if="$store.state.isFetching" class="loading"></loading>
    <div class="app-container">
      <transition name="fade">
        <router-view/>
      </transition>
    </div>
    <legals></legals>
  </div>
</template>

<script>
import Error from './components/Error'
import Legals from './components/Legals'
import Loading from './components/Loading'

export default {
  name: 'app',
  components: {
    Error,
    Legals,
    Loading
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html {
  font-size: 62.5%;
}

body {
  font-family: 'Roboto';
  font-weight: 400;
}

:root {
  --color-primary: #002E55;
  --color-primary-light: #3F5D7F;
  --color-primary-dark: #001B36;

  --color-secondary: #FF5987;

  --color-white: #D5DBE4;
  --color-dark: #222831;

  --title-big: 3.5rem;
  --title-medium: 2.5rem;
  --title-small: 1.75rem;
  --title-smallest: 1.5rem;

  --icon-size: 2.5rem;

  --shadow-dark: 0 6px 12px 0 rgba(0,0,0,0.4);
  --shadow-light: 0 2px 4px 0 rgba(0,0,0,0.2);

  --margin-big: 3rem;
  --margin-medium: 2rem;
  --margin-small: 1rem;
  --margin-smallest: 0.5rem;
}

/* SECTION STYLING */
section {
  padding: 2rem;
}

/* SECTION TITLE STYLING */
h2 {
  color: var(--color-white);
  font-size: var(--title-big);
  font-weight: 900;
}
</style>

<style lang="scss" scoped>
.apply-background {
  background-color: var(--color-primary-dark);
}

.app-container {
  min-height: 100vh;
}

.no-scroll {
  height: 100vh;
  overflow: hidden;
  padding-bottom: 0;
}

.loading {
  z-index: 5;
  position: absolute;
  top: 2rem;
  right: 2rem;
}

.fade-enter-active {
  transition: opacity .5s;
}

.fade-enter {
  opacity: 0;
}
</style>
