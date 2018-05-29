<template>
  <div>
    <h1>{{ categoryName }}</h1>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CategoryDetail',
  data() {
    return {
      categoryName: null,
      categoryId: null,
      categoryApiUrl: 'https://open-devos-api.herokuapp.com/topics',
      plans: []
    }
  },
  beforeMount() {
    console.log("params...", this.$route.params);
    console.log("query...", this.$route.query);

    this.categoryId = this.$route.query.category_id
    this.getCategoryPlans();
  },
  beforeRouteUpdate(to, from, next) {
    // react to route changes...
    // don't forget to call next()
  },
  methods: {
    getCategoryPlans() {
      axios
        .get(`${this.categoryApiUrl}/${this.categoryId}`)
        .then(response => {
          this.categoryName = response.data.topic.title;
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