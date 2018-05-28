<template>
  <div>
    <h1>Categories</h1>

    <div v-for="category in categories" :key="category.id">
      <pre>
          {{ category }}
        </pre>
      <a :href="category.url" target="_blank">{{ category.title }}</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Categories',
  data() {
    return {
      categoryApiUrl: 'https://open-devos-api.herokuapp.com/topics',
      categories: []
    }
  },
  beforeMount() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      axios
        .get(this.categoryApiUrl)
        .then(response => {
          this.categories.push(...response.data);
          console.log(this.categories);
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