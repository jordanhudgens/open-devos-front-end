<template>
  <div>
    <h1>Profile</h1>

    <h2>{{ profileSlug }}</h2>

    <div v-for="plan in profilePlans" :key="plan.id">
      <pre>{{ plan }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Profile',
  data() {
    return {
      profilePlans: [],
      profileSlug: null,
    }
  },
  created() {
    this.profileSlug = this.$route.params.user_slug;
    this.getResults(this.profileSlug);
  },
  methods: {
    getResults(user_slug) {
      this.results = [];

      axios
        .get(`https://open-devos-api.herokuapp.com/profile/${user_slug}`)
        .then(response => {
          console.log(response.data.plans)
          this.profilePlans.push(...response.data.plans);
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
}
</script>

<style scoped>

</style>