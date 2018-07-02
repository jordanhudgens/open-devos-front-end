<template>
  <div>
    <h1>Categories</h1>

    <div class="thumb-card-wrapper">
      <div v-for="category in categories" :key="category.id">
        <router-link :to="{ name: 'CategoryDetail', params: { category_slug: category.slug } }" class="link">
          <img src="@/assets/teal-placeholder.jpg" class="thumb-img">
        </router-link>

        <div class="thumb-card">
          <router-link :to="{ name: 'CategoryDetail', params: { category_slug: category.slug } }" class="link">
            <span class="title">{{ category.title }}</span>
          </router-link>
        </div>
      </div>
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