<template>
  <div id="app">
    <Navigation :navItems="pageElements"></Navigation>

    <div class="container">
      <div class="content-wrapper">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/shared/Navigation';
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Navigation
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  }
}
</script>

<style lang="scss">
html {
  font-family: 'Oxygen', sans-serif;
}

body {
  margin: 0px;
  width: 100vw;
}

.container {
  display: flex;
  justify-content: center;

  .content-wrapper {
    width: 900px;
  }
}

@media (max-width: 48em) {
  .container {
    width: calc(100vw - 30px);
    padding: 15px;

    div,
    .returned-content {
      width: 100% !important;
    }
  }
}
</style>
