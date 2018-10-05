<template>
  <div>
    <h2>Plans published by {{ profileSlug }}</h2>

    <div v-if="loading" class="spinner-wrapper">
      <i class="fas fa-circle-notch fa-spin fa-3x fa-fw"></i>
    </div>

    <h2 v-if="noPlansText">{{ noPlansText }}</h2>

    <ThumbCards :collection="plans" routeName="PlanDetail" />
  </div>
</template>

<script>
import axios from 'axios';
import ThumbCards from '@/components/shared/ThumbCards';

export default {
  name: 'Profile',
  data() {
    return {
      plans: [],
      profileSlug: null,
      loading: true,
      noPlansText: null,
    };
  },
  created() {
    this.profileSlug = this.$route.params.user_slug;
    this.getResults(this.profileSlug);
  },
  components: {
    ThumbCards,
  },
  methods: {
    getResults(user_slug) {
      axios
        .get(`https://open-devos-api.herokuapp.com/profile/${user_slug}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then(response => {
          this.plans.push(...response.data.plans);
          this.loading = false;

          if (this.plans.length === 0) {
            this.noPlansText = 'No published devotionals';
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
</style>
