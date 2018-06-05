<template>
  <div>
    <h1>Publish</h1>

    <div class="published-plans-wrapper">
      <h2>Published Plans</h2>
      {{ planResponseMessage }}
      <div v-for="plan in plans" :key="plan.id">
        <router-link :to="{ name: 'PlanDetail', params: { plan_slug: plan.slug}}">
          {{ plan.title }}
        </router-link>

        <div>
          <a @click.prevent="editPlan(plan)" href="#">Edit</a>
        </div>

        <div>
          <a href="#" @click.prevent="deletePlan" :id="`plan-delete-${plan.slug}`">Delete</a>
        </div>
      </div>
    </div>

    <div class="plan-form-wrapper">
      <button @click="renderPlanForm">Add a New Plan</button>
      <PlanForm v-if="showPlanForm" :planToEdit="planToEdit" :categories="categories" @new="addToPlans" @update="updatePlanList" />
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import router from '@/router';
import PlanForm from '@/components/plans/PlanForm';

export default {
  name: 'Publish',
  data() {
    return {
      plans: [],
      categories: [],
      selectedPlan: null,
      errorSubmittingForm: false,
      planSubmittedSuccessfully: false,
      planFormValidationMessage: null,
      errorDeletingPlan: false,
      planDeletedSuccessfully: false,
      planResponseMessage: null,
      showPlanForm: false,
      formMode: 'new',
      planToEdit: null,
      categoryApiUrl: 'https://open-devos-api.herokuapp.com/topics',
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  components: {
    PlanForm
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
    addToPlans(plan) {
      this.plans.push(plan);
      this.showPlanForm = false;
    },
    updatePlanList(plan) {
      this.plans.forEach(element => {
        if (element.id === plan.id) {
          element.title = plan.title;
          element.summary = plan.summary;
          element.topic.id = plan.topic.id;
        }
      }, this);
      this.showPlanForm = false;
    },
    formTypeSelector() {
      return this.formMode === 'new' ? this.submitPlanForm() : this.editPlanForm();
    },
    checkCurrentLogin() {
      if (!this.currentUser) {
        this.$router.push('login?auth_redirect=publish')
      }
    },
    renderPlanForm() {
      this.showPlanForm = true;
    },
    editPlan(plan) {
      this.showPlanForm = true;
      this.planToEdit = plan;
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