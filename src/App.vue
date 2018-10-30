<template>
  <div id="app">
    <div v-if="isLoading">
      Loading...
    </div>

    <div v-else>
      <Navigation />

      <div class="container">
        <div class="content-wrapper">
          <router-view :key="$route.path" />
        </div>

      </div>
      <div class="bottom-spacer"></div>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/shared/Navigation";
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
  name: "App",

  components: {
    Navigation
  },

  beforeMount() {
    this.getLoadingStatus();
  },

  computed: {
    ...mapState([
      'isLoading'
    ])
  },

  methods: {
    ...mapGetters([
      'getLoadingStatus',
      'getLoginStatus',
    ]),
  }
};
</script>

<style lang="scss">
@import './styles/main.scss';
</style>
