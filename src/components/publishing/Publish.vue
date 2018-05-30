<template>
  <div>
    <h1>Publish</h1>

    <div class="published-plans-wrapper">
      <button @click="formToggle" class="formToggleLink">New Plan</button>

      <h2>Published Plans</h2>
      <div v-for="plan in plans" :key="plan.id">
        <router-link :to="{ name: 'PlanDetail', params: { plan_slug: plan.slug}}">
          {{ plan.title }}
        </router-link>
      </div>
    </div>

    <div class="plan-form-wrapper">
      <h2>{{ responseMessage }}</h2>
      <form @submit.prevent="submitPlanForm">
        <input type="text" v-model="planTitle" placeholder="Title">
        <button>Save</button>
      </form>
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
      plans: [],
      showForm: false,
      planTitle: null,
      selectedPlan: null,
      errorSubmittingForm: false,
      planSubmittedSuccessfully: false,
      responseMessage: null
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
    submitPlanForm() {
      axios
        .post("https://open-devos-api.herokuapp.com/plans",
        {
          plan: {
            title: this.planTitle,
            topic_id: 1,
            user_id: this.currentUser.id
          }
        },
        {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(response.data);
          this.errorSubmittingForm = false;
          this.planSubmittedSuccessfully = true;
          this.responseMessage = 'The plan was successfully created';
          return response.data;
        })
        .catch(error => {
          console.log(error);
          this.responseMessage = 'There was an error submitting the form, please try again';
          this.errorSubmittingForm = true;
        })
    },
    formToggle() {
      console.log('Form toggle');
    },
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
.published-plans-wrapper {
  width: 400px;
  background-color: cyan;
}
</style>