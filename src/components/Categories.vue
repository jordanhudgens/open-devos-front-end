<template>
  <div>
    <h1>Categories</h1>

    <div v-for="category in categories" :key="category.id">
      <router-link :to="{ name: 'CategoryDetail', params: { category_slug: category.slug } }" class="link">
        {{ category.title }}
      </router-link>
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
    slugifyWrapper(str) {
      return slugify(str, { lower: true });
    },
    getCategories() {
      axios
        .get(this.categoryApiUrl)
        .then(response => {
          this.categories.push(...response.data.topics);
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