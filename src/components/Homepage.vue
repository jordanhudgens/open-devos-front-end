<template>
  <div class="homepage-wrapper">

    <div v-if="lastPlan.title" class="notification">
      <div class="left-column">
        <div class="title">{{ lastPlan.title }}</div>

        <div class="progress">
          Lesson {{ lastPlan.currentDevo.position + 1 }} of {{ lastPlan.devoCount }}
        </div>
      </div>
      <div class="right-column">
        <router-link class="btn-clear" :to="{ name: 'DevoDetail', params: { devo_slug: lastPlan.currentDevo.slug } }">
          Continue
        </router-link>
      </div>
    </div>

    <h1>Welcome to Open Devos, your home for discovering and publishing daily devotionals</h1>

    <div v-if="currentUser">
      {{ currentUser.email }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios';

export default {
  name: 'Homepage',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  mounted() {
    this.getLastPlan();
  },
  data() {
    return {
      lastPlan: {
        title: null,
        slug: null,
        devoCount: null,
        currentDevo: null
      }
    }
  },
  methods: {
    getLastPlan() {
      // TODO
      // Take care of situation where a user isn't logged in
      // Possibly in the component mount lifecycle hook
      axios
        .get('https://open-devos-api.herokuapp.com/last-plan',
        {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token'),
          }
        })
        .then(response => {
          if (response.data.plan_assignment) {
            console.log('plannnnns')
            console.log('plan_assignment', response.data.plan_assignment)
            const { title, slug } = response.data.plan_assignment.plan;
            const devo_count = response.data.plan_assignment.devo_count;
            const current_devo = response.data.plan_assignment.devo;
            this.lastPlan.title = title;
            this.lastPlan.slug = slug;
            this.lastPlan.currentDevo = current_devo;
            this.lastPlan.devoCount = devo_count;
          } else {
            console.log('No plans yet!')
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
}
</script>

<style scoped lang="scss">
@import './../styles/homepage.scss';
</style>
