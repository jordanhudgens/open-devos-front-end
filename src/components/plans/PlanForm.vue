<template>
  <div class="plan-form-wrapper">
    <div v-if="planSubmittedSuccessfully">
      <h2>{{ responseMessage }}</h2>
    </div>

    <div>
      <div v-if="errorSubmittingPlan">
        <h2>{{ responseMessage }}</h2>
      </div>

      <form @submit.prevent="formTypeSelector" class="form-wrapper">

        <input type="text" v-model="planTitle" placeholder="Title">

        <textarea v-model="planSummary" cols="30" rows="10" placeholder="Plan summary"></textarea>

        <div>{{ planStatus }}</div>
        <input type="checkbox" id="checkbox" v-model="planStatus" :true-value="'published'" :false-value="'draft'">
        <label v-if="planStatus === 'draft'" for="checkbox">Publish publicly?</label>
        <label v-else for="checkbox">Switch to draft?</label>

        <select v-model="planTopic">
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
        </select>

        <button type="submit" :disabled="!planTitle || !planTopic || !planSummary">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "PlanForm",
  data() {
    return {
      planTitle: null,
      planTopic: null,
      planSummary: null,
      planStatus: null,
      responseMessage: "",
      planSubmittedSuccessfully: false,
      errorSubmittingPlan: false
    };
  },
  props: {
    categories: Array,
    planToEdit: Object
  },
  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  },
  created() {
    if (this.planToEdit) {
      this.planTitle = this.planToEdit.title;
      this.planSummary = this.planToEdit.summary;
      this.planTopic = this.planToEdit.topic.id;
      this.planStatus = this.planToEdit.status;
    } else {
      this.planTitle = null;
      this.planSummary = null;
      this.planTopic = null;
      this.planStatus = null;
    }
  },
  watch: {
    planToEdit(newValue, oldValue) {
      this.planTitle = newValue.title;
      this.planSummary = newValue.summary;
      this.planTopic = newValue.topic.id;
      this.planStatus = newValue.status;
    }
  },
  methods: {
    formTypeSelector() {
      if (this.planToEdit) {
        this.editPlanForm();
      } else {
        this.submitPlanForm();
      }
    },
    editPlanForm() {
      axios
        .patch(
          `https://open-devos-api.herokuapp.com/plans/${this.planToEdit.slug}`,
          {
            plan: {
              title: this.planTitle,
              summary: this.planSummary,
              topic_id: this.planTopic,
              user_id: this.currentUser.id,
              status: this.planStatus
            }
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        )
        .then(response => {
          this.errorSubmittingPlan = false;
          this.planSubmittedSuccessfully = true;
          this.responseMessage = "Your plan has been updated!";
          this.$emit("update", response.data.plan);
          return response.data;
        })
        .catch(error => {
          console.log(error);
          this.responseMessage =
            "There was an error submitting the form, make sure you filled out all required fields.";
          this.errorSubmittingPlan = true;
        });
    },
    submitPlanForm() {
      axios
        .post(
          "https://open-devos-api.herokuapp.com/plans",
          {
            plan: {
              title: this.planTitle,
              summary: this.planSummary,
              topic_id: this.planTopic,
              user_id: this.currentUser.id,
              status: this.planStatus
            }
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        )
        .then(response => {
          this.errorSubmittingPlan = false;
          this.planSubmittedSuccessfully = true;
          this.responseMessage = "Your plan has been published!";
          this.$emit("new", response.data.plan);
          return response.data;
        })
        .catch(error => {
          console.log(error);
          this.responseMessage =
            "There was an error submitting the form, make sure you filled out all required fields.";
          this.errorSubmittingPlan = true;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
$teal: #156356;

.form-wrapper {
  display: grid;
  grid-template-columns: repeat(1fr);
  grid-gap: 20px;
  input {
    background-color: transparent;
    border-top: 1px transparent;
    border-right: 1px transparent;
    border-left: 1px transparent;
    border-bottom: 1px $teal solid;
    padding-bottom: 5px;
    border-radius: 0px;
  }
  button {
    font-size: 1em;
    background-color: $teal;
    border: $teal 1px solid;
    color: white;
    border-radius: 5px;
    height: 42px;
    font-weight: 900;
  }
  input[type="text"] {
    font-size: 1.2em;
  }
  textarea {
    background-color: transparent;
    font-size: 1.2em;
    border: 1px solid $teal;
    padding: 10px;
    border-radius: 0px;
  }
}
.plan-form-wrapper {
  margin-top: 30px;
}
</style>