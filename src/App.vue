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

  updated() {
    if (!this.getLoadingStatus()) {
      if (this.getLoginStatus() === 'NOT_LOGGED_IN') {
        if (this.routesThatDoNotRequireAuth().includes(this.$route.name)) {
          this.$router.push({ name: this.$route.name });
        } else {
          this.$router.push({ name: 'home' });
        }
      } else if (this.getLoginStatus() === 'LOGGED_IN' && !this.doesOrgExist()) {
        this.$router.push({ name: 'organization-manager' });
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
      'routesThatDoNotRequireAuth'
    ]),
  }
};
</script>

<style lang="scss">
@import './styles/main.scss';
</style>
