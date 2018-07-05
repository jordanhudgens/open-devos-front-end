<template>
  <div>
    <div class="banner-img-wrapper">
      <img :src="categoryBannerUrl" width="100%">
    </div>

    <ThumbCards :collection="plans" routeName="PlanDetail" />
  </div>
</template>

<script>
import axios from 'axios';
import ThumbCards from '@/components/shared/ThumbCards';

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
  components: {
    ThumbCards
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