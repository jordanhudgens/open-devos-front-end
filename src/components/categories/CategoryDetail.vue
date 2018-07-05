<template>
  <div>
    <div class="banner-img-wrapper">
      <img :src="categoryBannerUrl" width="100%">
    </div>

    <div class="thumb-card-wrapper">
      <div v-for="plan in plans" :key="plan.id">
        <router-link :to="{ name: 'PlanDetail', params: { plan_slug: plan.slug } }">
          <img v-if="plan.featured_image" :src="plan.featured_image" class="thumb-img">
          <img v-else src="@/assets/teal-placeholder.jpg" class="thumb-img">
        </router-link>

        <div class="thumb-card">
          <router-link :to="{ name: 'PlanDetail', params: { plan_slug: plan.slug } }">
            <span class="title">{{ plan.title }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CategoryDetail',
  data() {
    return {
      categoryName: null,
      categoryBannerUrl: null,
      categorySlug: this.$route.params.category_slug,
      categoryApiUrl: 'https://open-devos-api.herokuapp.com/topics',
      plans: []
    }
  },
  beforeMount() {
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
          this.categoryBannerUrl = response.data.topic.banner;
          this.plans.push(...response.data.topic.plans);
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