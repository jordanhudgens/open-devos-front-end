<template>
  <div>
    <h1>Publish</h1>

    <div class="published-plans-wrapper">
      <div v-if="!showPlanForm">
        <button @click="togglePlanForm" class="showFormButton">New Plan</button>
      </div>

      <h2>Published Plans</h2>
      {{ planResponseMessage }}
      <div v-for="plan in plans" :key="plan.id">
        <router-link :to="{ name: 'PlanDetail', params: { plan_slug: plan.slug}}">
          {{ plan.title }}
        </router-link>

        <div>
          <a href="#" @click.prevent="togglePlanForm(plan, true)" :id="plan">Edit</a>
        </div>

        <div>
          <a href="#" @click.prevent="deletePlan" :id="`plan-delete-${plan.slug}`">Delete</a>
        </div>
      </div>
    </div>

    <div v-if="showPlanForm" class="plan-form-wrapper">
      <h2>{{ planFormValidationMessage }}</h2>
      <form @submit.prevent="formTypeSelector">
        <input type="text" v-model="planTitle" placeholder="Title">

        <select v-model="planTopic">
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
        </select>

        <textarea v-model="planSummary" cols="30" rows="10" placeholder="Plan summary"></textarea>

        <button type="submit" :disabled="!planTitle || !planTopic || !planSummary">Save</button>
        <button @click.prevent="togglePlanForm">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import router from '@/router';

export default {
  name: 'Publish',
  data() {
    return {
      plans: [],
      categories: [],
      planTitle: null,
      planTopic: null,
      planSummary: null,
      selectedPlan: null,
      errorSubmittingForm: false,
      planSubmittedSuccessfully: false,
      planFormValidationMessage: null,
      errorDeletingPlan: false,
      planDeletedSuccessfully: false,
      planResponseMessage: null,
      showPlanForm: false,
      formMode: 'new',
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
  created() {
    this.checkCurrentLogin()
  },
  updated() {
    this.checkCurrentLogin()
  },
  methods: {
    formTypeSelector() {
      return this.formMode === 'new' ? this.submitPlanForm() : this.editPlanForm();
    },
    checkCurrentLogin() {
      if (!this.currentUser) {
        this.$router.push('login?auth_redirect=publish')
      }
    },
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
          this.planResponseMessage = 'The plan was successfully deleted';
          return response.data;
        })
        .catch(error => {
          console.log(error);
          this.planResponseMessage = 'There was an error deleting the plan';
          this.errorDeletingPlan = true;
        })
    },
    submitPlanForm() {
      axios
        .post("https://open-devos-api.herokuapp.com/plans",
        {
          plan: {
            title: this.planTitle,
            summary: this.planSummary,
            topic_id: this.planTopic,
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
          this.planResponseMessage = 'The plan was successfully created';
          this.planTitle = null;
          this.planTopic = null;
          this.planSummary = null;
          this.showPlanForm = false;
          return response.data;
        })
        .catch(error => {
          console.log(error);
          this.planFormValidationMessage = 'There was an error submitting the form, please try again';
          this.errorSubmittingForm = true;
        })
    },
    editPlanForm() {
      axios
        .patch("https://open-devos-api.herokuapp.com/plans",
        {
          plan: {
            title: this.planTitle,
            summary: this.planSummary,
            topic_id: this.planTopic,
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
          this.planResponseMessage = 'The plan was successfully updated';
          this.planTitle = null;
          this.planTopic = null;
          this.planSummary = null;
          this.showPlanForm = false;
          return response.data;
        })
        .catch(error => {
          console.log(error);
          this.planFormValidationMessage = 'There was an error updated the form, please try again';
          this.errorSubmittingForm = true;
        })
    },
    togglePlanForm(plan = null, edit = false) {
      if (edit) {
        this.formMode = 'edit';
        this.showPlanForm = true;
        this.planTitle = plan.title;
        this.planTopic = plan.topic.id;
        this.planSummary = plan.summary;
      } else {
        this.formMode = 'new';
        this.planTitle = null;
        this.planTopic = null;
        this.planSummary = null;
        this.showPlanForm = !this.showPlanForm;
      }
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