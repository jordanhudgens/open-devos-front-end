<template>
  <div>
    <h1>Published Plans</h1>

    <div class="card published-plans-wrapper">
      {{ planResponseMessage }}
      <div v-for="plan in plans" :key="plan.id">
        <div class="left-column">
          <div class="row1">
            <router-link :to="{ name: 'PlanDetail', params: { plan_slug: plan.slug}}">
              <span class="title">{{ plan.title }}</span>
            </router-link>
          </div>

          <div class="row2">
            <span>
              <router-link :to="{ name: 'CategoryDetail', params: { category_slug: plan.topic.slug } }" class="link">
                {{ plan.topic.title }}
              </router-link>
            </span>

            <span v-if="plan.last_published">
              {{ plan.last_published }}
            </span>
          </div>

        </div>

        <pre>{{ plan }}</pre>

        <div>
          <a @click.prevent="editPlan(plan)" href="#">Edit</a>
        </div>

        <div v-if="currentUser.id === plan.user.id">
          <a href="#" @click.prevent="deletePlan(plan)">Delete</a>
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
          element.status = plan.status;
        }
      }, this);
      this.showPlanForm = false;
    },
    formTypeSelector() {
      return this.formMode === 'new' ? this.submitPlanForm() : this.editPlanForm();
    },
    renderPlanForm() {
      this.showPlanForm = true;
    },
    editPlan(plan) {
      this.showPlanForm = true;
      this.planToEdit = plan;
    },
    deletePlan(plan) {
      axios
        .delete(`https://open-devos-api.herokuapp.com/plans/${plan.slug}`,
        {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          this.errorDeletingPlan = false;
          this.planDeletedSuccessfully = true;
          this.plans = this.plans.filter(el => el.slug !== plan.slug);
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
            user_id: this.currentUser.id
          }
        }).then(response => {
          this.plans.push(...response.data.plans);
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
}
</style>