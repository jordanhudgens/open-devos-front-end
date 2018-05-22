<template>
  <div>
    <h1>Search results</h1>
  </div>
</template>

<script>
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
    '$route'(to, from) {
      console.log('watcher...');
    }
  },
  methods: {
    getResults(q) {
      this.results = [];
      console.log(q);

      // axios
      //   .get("https://api.dailysmarty.com/search", { params: { q } })
      //   .then(response => {
      //     this.results.push(...response.data.posts);
      //     this.gettingResults = false;
      //     console.log(response.data.posts);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    },
  }
}
</script>

<style scoped>

</style>