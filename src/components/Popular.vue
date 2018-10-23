<template>
  <div>
    <h2>Popular Plans</h2>

    <div v-if="loading" class="spinner-wrapper">
      <i class="fas fa-circle-notch fa-spin fa-3x fa-fw"></i>
    </div>

    <ThumbCards :collection="plans" routeName="PlanDetail" />
  </div>
</template>

<script>
import axios from 'axios';
import ThumbCards from '@/components/shared/ThumbCards';

export default {
  name: 'Popular',
  data() {
    return {
      plans: [],
      loading: true,
    }
  },

  created() {
    this.getPopularPlans();
  },

  components: {
    ThumbCards,
  },

  methods: {
    getPopularPlans() {
      axios
        .get(`https://open-devos-api.herokuapp.com/popular`)
        .then(response => {
          console.log("response", response);
          this.plans.push(...response.data.plans);
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
}
</script>
