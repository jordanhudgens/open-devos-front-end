<template>
  <div>
    <h1>{{ planName }}</h1>

    <h3>{{ planSummary }}</h3>

    <div v-for="devo in devos" :key="devo.slug">
      <router-link :to="{ name: 'DevoDetail', params: { devo_slug: devo.slug } }">
        {{ devo.title }}
      </router-link>

      <a @click.prevent="deleteDevo" href="#" :id="'devo-delete-' + devo.slug">Delete</a>
    </div>

    <div class="devo-form-wrapper">
      <DevoForm :planId="planId" :devos="devos" @update="syncDevos" />
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
      devoDeletionResponseMessage: null
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
    syncDevos(devo) {
      this.devos.push(devo);
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