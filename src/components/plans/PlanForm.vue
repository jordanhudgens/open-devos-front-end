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

        <div>
          <p>Featured Image:
            <file-select v-model="planFeaturedImage"></file-select>
          </p>
          <p v-if="planFeaturedImage">{{ planFeaturedImage.name }}</p>
        </div>

        <select v-model="planTopic">
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
        </select>

        <div v-if="!planTitle || !planTopic || !planSummary">
          <button type="submit" class="btn-disabled" disabled>Fill in required fields</button>
        </div>

        <div v-else>
          <button type="submit" class="btn">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import FileSelect from '@/components/shared/FileSelect';

export default {
  name: "PlanForm",
  data() {
    return {
      planTitle: null,
      planTopic: null,
      planSummary: null,
      planStatus: null,
      planFeaturedImage: null,
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
  components: {
    FileSelect
  },
  created() {
    if (this.planToEdit) {
      this.planTitle = this.planToEdit.title;
      this.planSummary = this.planToEdit.summary;
      this.planTopic = this.planToEdit.topic.id;
      this.planStatus = this.planToEdit.status;
      this.planFeaturedImage = this.planToEdit.planFeaturedImage;
    } else {
      this.planTitle = null;
      this.planSummary = null;
      this.planTopic = null;
      this.planStatus = null;
      this.planFeaturedImage = null;
    }
  },
  watch: {
    planToEdit(newValue, oldValue) {
      this.planTitle = newValue.title;
      this.planSummary = newValue.summary;
      this.planTopic = newValue.topic.id;
      this.planStatus = newValue.status;
      this.planFeaturedImage = newValue.planFeaturedImage;
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
    buildForm() {
      let formData = new FormData();

      formData.append('plan[title]', this.planTitle);
      formData.append('plan[summary]', this.planSummary);
      formData.append('plan[topic_id]', this.planTopic);
      formData.append('plan[user_id]', this.currentUser.id);

      if (this.planStatus) {
        formData.append('plan[status]', this.planStatus);
      }

      if (this.planFeaturedImage) {
        formData.append('plan[plan_image]', this.planFeaturedImage);
      }

      return formData;
    },
    editPlanForm() {
      axios
        .patch(
        `https://open-devos-api.herokuapp.com/plans/${this.planToEdit.slug}`,
        this.buildForm(),
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
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
        this.buildForm(),
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

.plan-form-wrapper {
  margin-top: 30px;
}
</style>