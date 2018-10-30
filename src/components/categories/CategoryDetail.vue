<template>
  <div>
    <div class="banner-img-wrapper">
      <img :src="category.bannerUrl" width="100%">
    </div>

    <div v-if="!category.bannerUrl" class="spinner-wrapper">
      <i class="fas fa-circle-notch fa-spin fa-3x fa-fw"></i>
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
      category: {
        name: null,
        bannerUrl: null,
        slug: this.$route.params.category_slug,
      },
      categoryApiUrl: 'https://open-devos-api.herokuapp.com/topics',
      plans: []
    }
  },

  beforeMount() {
    this.getCategoryPlans();
  },

  beforeRouteUpdate(to, from, next) {
    this.category.slug = this.$route.params.category_slug
    next()
  },

  components: {
    ThumbCards
  },

  methods: {
    getCategoryPlans() {
      axios
        .get(`${this.categoryApiUrl}/${this.category.slug}`)
        .then(response => {
          this.category.name = response.data.topic.title;
          this.category.bannerUrl = response.data.topic.banner;
          this.plans.push(...response.data.topic.plans);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>