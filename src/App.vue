<template>
  <div id="app">
    <Navigation :navItems="pageElements"></Navigation>
    <router-view/>
  </div>
</template>

<script>
import Navigation from '@/components/shared/Navigation';

export default {
  name: 'App',
  data() {
    return {
      pageElements: [1, 2, 3]
    }
  },
  components: {
    Navigation
  }
}
</script>

<style>
html {
  font-family: 'Oxygen', sans-serif;
}

body {
  margin: 0px;
}
</style>
