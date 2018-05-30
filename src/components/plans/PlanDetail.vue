<template>
  <div>
    <h1>{{ planName }}</h1>
    <div v-for="devo in devos" :key="devo.slug">
      <router-link :to="{ name: 'DevoDetail', params: { devo_slug: devo.slug } }">
        {{ devo.title }}
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PlanDetail',
  data() {
    return {
      planName: null,
      planSlug: this.$route.params.plan_slug,
      planApiUrl: 'https://open-devos-api.herokuapp.com/plans',
      devos: []
    }
  },
  beforeMount() {
    console.log("params...", this.$route.params);

    this.getPlanDetails();
  },
  beforeRouteUpdate(to, from, next) {
    this.planSlug = this.$route.params.plan_slug
    next()
  },
  methods: {
    getPlanDetails() {
      axios
        .get(`${this.planApiUrl}/${this.planSlug}`)
        .then(response => {
          this.planName = response.data.plan.title;
          this.devos.push(...response.data.plan.devos);
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>

</style>