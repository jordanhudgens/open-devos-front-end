<template>
  <div id="app">
    <Navigation />

    <div class="container">
      <div class="content-wrapper">
        <router-view :key="$route.path" />
      </div>

    </div>
    <div class="bottom-spacer"></div>
  </div>
</template>

<script>
import Navigation from "@/components/shared/Navigation";
import { mapGetters } from "vuex";


export default {
  name: "App",
  components: {
    Navigation
  },
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  }
};
</script>

<style lang="scss">
@import './styles/common.scss';
</style>
