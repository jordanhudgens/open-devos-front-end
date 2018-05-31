<template>
  <div>
    <h1>Publish</h1>

    <div class="published-plans-wrapper">
      <button @click="formToggle" class="formToggleLink">New Plan</button>

      <h2>Published Plans</h2>
      {{ planDeletionResponseMessage }}
      <div v-for="plan in plans" :key="plan.id">
        <router-link :to="{ name: 'PlanDetail', params: { plan_slug: plan.slug}}">
          {{ plan.title }}
        </router-link>

        <div>
          <a href="#" @click.prevent="deletePlan" :id="`plan-delete-${plan.slug}`">Delete</a>
        </div>
      </div>
    </div>

    <div class="plan-form-wrapper">
      <h2>{{ responseMessage }}</h2>
      <form @submit.prevent="submitPlanForm">
        <input type="text" v-model="planTitle" placeholder="Title">

        <select v-model="planTopic">
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
        </select>
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
      categories: [],
      showForm: false,
      planTitle: null,
      planTopic: null,
      selectedPlan: null,
      errorSubmittingForm: false,
      planSubmittedSuccessfully: false,
      responseMessage: null,
      errorDeletingPlan: false,
      planDeletedSuccessfully: false,
      planDeletionResponseMessage: null,
      categoryApiUrl: 'https://open-devos-api.herokuapp.com/topics',
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  beforeMount() {
    this.getCurrentPlans()
    this.getCategories()
  },
  methods: {
    deletePlan(evt) {
      let url = evt.target.id;
      url = url.split('-');
      const slug = url.slice(2).join('-');

      axios
        .delete(`https://open-devos-api.herokuapp.com/plans/${slug}`,
        {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          this.errorDeletingPlan = false;
          this.planDeletedSuccessfully = true;
          this.plans = this.plans.filter(plan => plan.slug !== slug);
          this.planDeletionResponseMessage = 'The plan was successfully deleted';
          return response.data;
        })
        .catch(error => {
          console.log(error);
          this.planDeletionResponseMessage = 'There was an error deleting the devo';
          this.errorDeletingPlan = true;
        })
    },
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
          this.errorSubmittingForm = false;
          this.planSubmittedSuccessfully = true;
          this.plans.push(response.data.plan);
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
          console.log(this.plans);
        }).catch(error => {
          console.log('error: ', error);
        });
    },
    getCategories() {
      axios
        .get(this.categoryApiUrl)
        .then(response => {
          this.categories.push(...response.data.topics);
        })
        .catch(error => {
          console.log(error);
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