<template>
  <div>
    <img src="https://s3.amazonaws.com/open-devos-static/categories/banner-pride.jpg" width="100%">
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
      categorySlug: this.$route.params.category_slug,
      categoryApiUrl: 'https://open-devos-api.herokuapp.com/topics',
      plans: []
    }
  },
  beforeMount() {
    console.log("params...", this.$route.params);

    this.getCategoryPlans();
  },
  beforeRouteUpdate(to, from, next) {
    this.categorySlug = this.$route.params.category_slug
    next()
  },
  methods: {
    getCategoryPlans() {
      axios
        .get(`${this.categoryApiUrl}/${this.categorySlug}`)
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