<template>
  <div>
    <h1>{{ planName }}</h1>

    <h3>{{ planSummary }}</h3>

    <div v-for="devo in devos" :key="devo.slug">
      <router-link :to="{ name: 'DevoDetail', params: { devo_slug: devo.slug } }">
        {{ devo.title }}
      </router-link>

      <a @click.prevent="deleteDevo" href="#" :id="'devo-delete-' + devo.slug">Delete</a>
      <a @click.prevent="editDevo(devo)" href="#">Edit</a>
    </div>

    <div class="devo-form-wrapper">
      <button v-if="showNewDevoButton" @click="renderDevoForm">Add a New Devo</button>
      <button v-if="!showNewDevoButton" @click="cancelDevoForm">Cancel</button>
      <DevoForm v-if="showForm" :passedDevoTitle="devoToEdit.title" :devoToEdit.sync="devoToEdit" :planId="planId" :devos="devos" @new="addToDevos" @update="updateDevoList" :key="devoFormKey" />
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
  beforeUpdate() {
    console.log('mounted', this.devoToEdit);
    if (this.devoToEdit) {
      this.devoTitle = this.devoToEdit.title;
      this.devoContent = this.devoToEdit.content;
    }
  },
  updated() {
    console.log('devo to update', this.devoToEdit);
    if (this.devoToEdit) {
      this.devoTitle = this.devoToEdit.title;
      this.devoContent = this.devoToEdit.content;
    }
  },
  beforeDestroy() {
    console.log('beforeDestory', this.devoToEdit);
    if (this.devoToEdit) {
      this.devoTitle = this.devoToEdit.title;
      this.devoContent = this.devoToEdit.content;
    }
  },
  beforeDestroy() {
    console.log('destroyed', this.devoToEdit);
    if (this.devoToEdit) {
      this.devoTitle = this.devoToEdit.title;
      this.devoContent = this.devoToEdit.content;
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.planSlug = this.$route.params.plan_slug
    next()
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  watch: {
    devoToEdit(dte) {
      this.devoToEdit = dte;
    }
  },
  methods: {
    cancelDevoForm() {
      this.showNewDevoButton = true;
      this.showForm = false;
    },
    addToDevos(devo) {
      this.devos.push(devo);
      this.showForm = false;
    },
    updateDevoList(devo) {
      this.devos.forEach(element => {
        if (element.id === devo.id) {
          element.title = devo.title;
          element.content = devo.content;
        }
      }, this);
      this.showForm = false;
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
    deleteDevo(evt) {
      let url = evt.target.id;
      url = url.split('-');
      const slug = url.slice(2).join('-');

      axios
        .delete(`https://open-devos-api.herokuapp.com/devos/${evt.target.id.slice(12)}`,
        {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          this.errorDeletingDevo = false;
          this.devoDeletedSuccessfully = true;
          this.devos = this.devos.filter(devo => devo.slug !== slug);
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
          this.devos.push(...response.data.plan.devos);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>

</style>