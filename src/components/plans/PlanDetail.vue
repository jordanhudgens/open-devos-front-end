<template>
  <div>
    <h1>{{ planName }}</h1>

    <div class="plan-summary">{{ planSummary }}</div>

    <div class="devo-thumb-card-wrapper">
      <div v-for="devo in devos" :key="devo.slug">
        <img v-if="devo.featured_image" :src="devo.featured_image" class="devo-thumb-img">
        <img v-else src="@/assets/teal-placeholder.jpg" class="devo-thumb-img">

        <div class="devo-thumb-card">
          <router-link :to="{ name: 'DevoDetail', params: { devo_slug: devo.slug } }">
            {{ devo.title }}
          </router-link>

          <div v-if="currentUser && currentUser.id === planOwner">
            <a @click.prevent="deleteDevo(devo)" href="#">Delete</a>
            <a @click.prevent="editDevo(devo)" href="#">Edit</a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentUser && currentUser.id === planOwner" class="devo-form-wrapper">
      <button v-if="showNewDevoButton" @click="renderDevoForm" class="btn">Add a New Devo</button>
      <button v-if="!showNewDevoButton" @click="cancelDevoForm" class="btn">Cancel</button>
      <DevoForm v-if="showForm" :devoToEdit.sync="devoToEdit" :planId="planId" :devos="devos" @new="addToDevos" @update="updateDevoList" :key="devoFormKey" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import DevoForm from '@/components/devos/DevoForm';

export default {
  name: 'PlanDetail',
  data() {
    return {
      planName: null,
      planSummary: null,
      planSlug: this.$route.params.plan_slug,
      planId: null,
      planOwner: null,
      planApiUrl: 'https://open-devos-api.herokuapp.com/plans',
      devos: [],
      errorDeletingDevo: false,
      devoDeletedSuccessfully: false,
      devoDeletionResponseMessage: null,
      showForm: false,
      devoToEdit: null,
      showNewDevoButton: true,
      devoFormKey: null
    }
  },
  components: {
    DevoForm
  },
  beforeMount() {
    this.getPlanDetails();
  },
  beforeRouteUpdate(to, from, next) {
    this.planSlug = this.$route.params.plan_slug
    next()
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  methods: {
    cancelDevoForm() {
      this.showNewDevoButton = true;
      this.showForm = false;
    },
    addToDevos(devo) {
      this.devos.push(devo);
      this.showForm = false;
      this.showNewDevoButton = true;
    },
    updateDevoList(devo) {
      this.devos.forEach(element => {
        if (element.id === devo.id) {
          element.title = devo.title;
          element.content = devo.content;
          element.status = devo.status;
          element.featured_image = devo.featured_image;
        }
      }, this);
      this.showForm = false;
      this.showNewDevoButton = true;
    },
    renderDevoForm() {
      this.showNewDevoButton = false;
      this.showForm = true;
      this.devoToEdit = null;
    },
    editDevo(devo) {
      this.showNewDevoButton = false;
      this.showForm = true;
      this.devoToEdit = devo;
    },
    deleteDevo(devo) {
      console.log('devo', devo.slug);
      axios
        .delete(`https://open-devos-api.herokuapp.com/devos/${devo.slug}`,
        {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          this.errorDeletingDevo = false;
          this.devoDeletedSuccessfully = true;
          this.devos = this.devos.filter(el => el.slug !== devo.slug);
          this.devoDeletionResponseMessage = 'The devo was successfully deleted';
          return response.data;
        })
        .catch(error => {
          console.log(error);
          this.devoDeletionResponseMessage = 'There was an error deleting the devo';
          this.errorDeletingDevo = true;
        })
    },
    getPlanDetails() {
      axios
        .get(`${this.planApiUrl}/${this.planSlug}`)
        .then(response => {
          this.planName = response.data.plan.title;
          this.planSummary = response.data.plan.summary;
          this.planId = response.data.plan.id;
          this.planOwner = response.data.plan.user.id;
          this.devos.push(...response.data.plan.devos);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Merriweather');

.plan-summary {
  font-family: 'Merriweather', serif;
  margin-bottom: 42px;
}

.devo-thumb-img {
  width: 100%;
  -webkit-box-shadow: 6px 6px 40px 2px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 6px 6px 40px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 6px 6px 40px 2px rgba(0, 0, 0, 0.2);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.devo-thumb-card {
  margin-top: -4px;
  padding: 20px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  -webkit-box-shadow: 6px 6px 40px 2px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 6px 6px 40px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 6px 6px 40px 2px rgba(0, 0, 0, 0.2);
}

.devo-thumb-card-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 42px;
}
</style>