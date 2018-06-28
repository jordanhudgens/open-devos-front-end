<template>
  <div>
    <h1>Published Plans</h1>

    <div class="published-plans-wrapper">

      <div class="card published-plans-card-wrapper">
        {{ planResponseMessage }}

        <div class="plans-wrapper">
          <div v-for="plan in plans" :key="plan.id" class="split-columns">
            <div class="left-column">
              <div class="row1">
                <router-link :to="{ name: 'PlanDetail', params: { plan_slug: plan.slug}}">
                  <span class="title">{{ plan.title }}</span>
                </router-link>
              </div>

              <div class="plan-metadata">
                <span>
                  <router-link :to="{ name: 'CategoryDetail', params: { category_slug: plan.topic.slug } }" class="category-link">
                    {{ plan.topic.title }}
                  </router-link>
                </span>

                <span v-if="plan.last_published">
                  Last published {{ formatDate(plan.last_published) }}
                </span>

                <span v-if="plan.devos.length > 0 && plan.devos.length === 1">
                  {{ plan.devos.length }} lesson
                </span>
                <span v-else-if="plan.devos.length > 0">
                  {{ plan.devos.length }} lessons
                </span>
              </div>
            </div>

            <div class="right-column action-icon-wrapper">
              <div>
                <a @click.prevent="editPlan(plan)" href="#" class="action-icon">
                  <i class="fas fa-pen-square"></i>
                </a>
              </div>

              <div v-if="currentUser.id === plan.user.id">
                <a href="#" @click.prevent="deletePlan(plan)" class="action-icon">
                  <i class="fas fa-trash"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="plan-form-wrapper">
        <button @click="renderPlanForm" class="btn">{{ planBtnText }}</button>
        <transition name="fade">
          <PlanForm v-if="showPlanForm" :planToEdit="planToEdit" :categories="categories" @new="addToPlans" @update="updatePlanList" />
        </transition>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import moment from "moment";
import router from "@/router";
import PlanForm from "@/components/plans/PlanForm";

export default {
  name: "Publish",
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
      formMode: "new",
      planToEdit: null,
      planBtnText: "Add a New Plan",
      categoryApiUrl: "https://open-devos-api.herokuapp.com/topics"
    };
  },
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  },
  components: {
    PlanForm
  },
  beforeMount() {
    this.getCurrentPlans();
    this.getCategories();
  },
  methods: {
    addToPlans(plan) {
      this.plans.push(plan);
      this.showPlanForm = false;
      this.planBtnText = "Add a New Plan";
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
      this.planBtnText = "Add a New Plan";
      this.planToEdit = null;
    },
    formatDate(date) {
      return moment(date).fromNow();
    },
    formTypeSelector() {
      return this.formMode === "new"
        ? this.submitPlanForm()
        : this.editPlanForm();
    },
    renderPlanForm() {
      this.showPlanForm = !this.showPlanForm;

      if (this.showPlanForm) {
        this.planBtnText = "Cancel";
      } else {
        this.planBtnText = "Add a New Plan";
        this.planToEdit = null;
      }
    },
    editPlan(plan) {
      this.showPlanForm = true;
      this.planToEdit = plan;
      this.planBtnText = "Cancel";
    },
    deletePlan(plan) {
      this.$swal({
        title: 'Are you sure you want to delete this plan?',
        text: "This will permanently delete the plan and you won't be able to get it back",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes Delete it!',
        cancelButtonText: 'No, Keep it!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if (result.value) {
          axios
            .delete(`https://open-devos-api.herokuapp.com/plans/${plan.slug}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
              }
            })
            .then(response => {
              this.errorDeletingPlan = false;
              this.planDeletedSuccessfully = true;
              this.plans = this.plans.filter(el => el.slug !== plan.slug);
              this.planResponseMessage = "The plan was successfully deleted";
              return response.data;
            })
            .catch(error => {
              console.log(error);
              this.planResponseMessage = "There was an error deleting the plan";
              this.errorDeletingPlan = true;
            });
          this.$swal('Deleted', 'You successfully deleted the plan', 'success')
        } else {
          this.$swal('Cancelled', 'Your plan is still intact!', 'info')
        }
      })
    },
    togglePlanForm(plan = null, edit = false) {
      if (edit) {
        this.formMode = "edit";
        this.showPlanForm = true;
        this.planTitle = plan.title;
        this.planTopic = plan.topic.id;
        this.planSummary = plan.summary;
      } else {
        this.formMode = "new";
        this.planTitle = null;
        this.planTopic = null;
        this.planSummary = null;
        this.showPlanForm = !this.showPlanForm;
      }
    },
    getCurrentPlans() {
      axios
        .get("https://open-devos-api.herokuapp.com/user-plans", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
          params: {
            user_id: this.currentUser.id
          }
        })
        .then(response => {
          this.plans.push(...response.data.plans);
        })
        .catch(error => {
          console.log("error: ", error);
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
};
</script>

<style scoped>
.published-plans-wrapper {
  display: grid;
  grid-template-columns: 600px auto;
  grid-gap: 42px;
}

.published-plans-card-wrapper {}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */

{
  opacity: 0;
}
</style>