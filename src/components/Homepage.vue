<template>
  <div class="x">

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

    <div class="homepage-wrapper">
      <div class="left-column">

        <div class="two-column-grid">
          <div v-for="plan in randomPlans" :key="plan.id" class="single-card-wrapper">
            <router-link :to="{ name: 'PlanDetail', params: { slug: plan.slug } }">
              <img v-if="plan.featured_image" :src="plan.featured_image" class="thumb-img">
              <img v-else src="@/assets/teal-placeholder.jpg" class="thumb-img">
            </router-link>

            <div class="thumb-card">
              <router-link :to="{ name: 'PlanDetail', params: { slug: plan.slug } }">
                <span class="title">{{ plan.title }}</span>
              </router-link>
            </div>
          </div>
        </div>

        <div class="spacer40"></div>

        <div class="one-column-grid">
          <div class="card">
            <router-link :to="{ name: 'PlanDetail', params: { slug: 'living-with-humility' } }">
              <span class="title">{{ 'Some Title' }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'Homepage',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  mounted() {
    console.log('Mounted');

    this.getRandomPlans();

    if (this.currentUser) {
      console.log('currentUser', this.currentUser);
      this.getLastPlan();
    } else {
      console.log("not logged in");
    }
  },
  data() {
    return {
      lastPlan: {
        title: null,
        slug: null,
        devoCount: null,
        currentDevo: null
      },
      randomPlans: []
    }
  },
  methods: {
    getRandomPlans() {
      axios
        .get('https://open-devos-api.herokuapp.com/random_plans')
        .then(response => {
          this.randomPlans.push(...response.data.plans);
        })
        .catch(error => {
          console.log(error);
        });
    },
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
@import './../styles/grid.scss';
@import './../styles/homepage.scss';
@import './../styles/card.scss';
@import './../styles/helpers.scss';
</style>
