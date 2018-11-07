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

  // TODO
  // Figure out why the updated action isn't triggering with route changes
  // needed to get the route guard working

  updated() {
    console.log("getLoadingStatus", this.getLoadingStatus());
    if (!this.getLoadingStatus()) {
      console.log("getLoginStatus", this.getLoginStatus());
      if (this.getLoginStatus() === 'NOT_LOGGED_IN') {
        if (this.routesThatDoNotRequireAuth().includes(this.$route.name)) {
          this.$router.push({ name: this.$route.name });
        } else {
          this.$router.push({ name: 'Homepage' });
        }
      }
    }
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
      'routesThatDoNotRequireAuth',
    ]),
  }
};
</script>

<style lang="scss">
@import './styles/main.scss';
</style>
