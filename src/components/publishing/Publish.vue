<template>
  <div>
    <h1>Publish</h1>

    <h2>Published Plans</h2>

    <div v-for="plan in plans" :key="plan.id">
      {{ plan.title }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'Publish',
  data() {
    return {
      plans: []
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  beforeMount() {
    console.log(this.currentUser.id);
    this.getCurrentPlans()
  },
  methods: {
    getCurrentPlans() {
      axios.get('https://open-devos-api.herokuapp.com/user-plans',
        {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token')
          },
          params: {
            user_id: 1
          }
        }).then(response => {
          this.plans.push(...response.data.plans);
          console.log('data: ', response);
        }).catch(error => {
          console.log('error: ', error);
        });
    }
  }
}
</script>

<style scoped>

</style>