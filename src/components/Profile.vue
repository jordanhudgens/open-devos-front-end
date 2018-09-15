<template>
  <div>
    <h2>Plans published by {{ profileSlug }}</h2>

    <div v-if="plans.length === 0" class="spinner-wrapper">
      <i class="fas fa-circle-notch fa-spin fa-3x fa-fw"></i>
    </div>

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
    }
  },
  created() {
    this.profileSlug = this.$route.params.user_slug;
    this.getResults(this.profileSlug);
  },
  components: {
    ThumbCards
  },
  methods: {
    getResults(user_slug) {
      axios
        .get(`https://open-devos-api.herokuapp.com/profile/${user_slug}`, {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token'),
          }
        })
        .then(response => {
          this.plans.push(...response.data.plans);
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