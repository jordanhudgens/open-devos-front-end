<template>
  <div class="homepage-wrapper">

    <div v-if="lastPlan.title" class="notification">
      <div class="left-column">
        <div class="title">{{ lastPlan.title }}</div>

        <div class="progress">
          Lesson 2 of {{ lastPlan.devoCount }}
        </div>
      </div>
      <!--TODO Finish homepage  -->

      <div class="right-column">
        <router-link class="btn-clear" :to="{ name: 'Homepage' }">
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
        devoCount: null
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
            const { title, } = response.data.plan_assignment.plan;
            const devo_count = response.data.plan_assignment.devo_count;
            this.lastPlan.title = title;
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
$teal: #156356;

.notification {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: $teal;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  color: white;

  .title {
    font-weight: 900;
    font-size: 1.5em;
    margin-bottom: 15px;
  }

  .right-column {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    a {
      color: white;
    }
  }
}
</style>
