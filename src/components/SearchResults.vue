<template>
  <div>
    <h1>Search results</h1>

    <div v-for="devo in results" :key="devo.id">
      <router-link :to="{ name: 'DevoDetail', params: { devo_slug: devo.slug } }">{{ devo.title }}</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchResults',
  data() {
    return {
      query: null,
      results: [],
      gettingResults: true,
    }
  },
  beforeMount() {
    this.query = this.$route.params.query;
    this.getResults(this.query);
  },
  watch: {
  },
  methods: {
    getResults(query) {
      this.results = [];
      console.log(query);

      axios
        .get("https://open-devos-api.herokuapp.com/search", { params: { query } })
        .then(response => {
          console.log(response)
          this.results.push(...response.data.devos);
          this.gettingResults = false;
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