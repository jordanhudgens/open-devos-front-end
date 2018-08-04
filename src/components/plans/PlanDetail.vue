<template>
  <div>
    <div class="spacer"></div>
    <div v-if="!plan.name" class="spinner-wrapper">
      <i class="fas fa-circle-notch fa-spin fa-3x fa-fw"></i>
    </div>

    <div class="plan-header-wrapper">
      <div class="left-column">
        <h1>{{ plan.name }}</h1>
        <div class="plan-summary">{{ plan.summary }}</div>
      </div>

      <div class="right-column">
        <div v-if="currentUser && !planStarted">
          <button @click.prevent="startPlan" class="btn">Start Plan</button>
        </div>
        <div v-else-if="currentUser && planStarted">
          <button @click.prevent="archivePlan" class="btn">Archive Plan</button>
        </div>
        <div v-else>
          <router-link :to="{ name: 'Register' }">
            Sign Up to Take Plan
          </router-link>
        </div>
      </div>
    </div>

    <!-- TODO: -->
    <!-- build algo for auto updating positions -->
    <!-- then send the devos and their positions to the update action -->

    <draggable v-model="devos" @end="updatePosition">
      <transition-group name="thumb-card-wrapper" class="thumb-card-wrapper">
        <div v-for="devo in devos" :key="devo.slug" class="animated-draggable-thumb-card">
          <router-link :to="{ name: 'DevoDetail', params: { devo_slug: devo.slug } }">
            <img v-if="devo.featured_image" :src="devo.featured_image" class="thumb-img">
            <img v-else src="@/assets/teal-placeholder.jpg" class="thumb-img">
          </router-link>

          <div class="thumb-card">
            <router-link :to="{ name: 'DevoDetail', params: { devo_slug: devo.slug } }">
              <span class="title">{{ devo.title }}</span>
            </router-link>

            <div class="dayCountDescription">
              Day {{ devo.position + 1 }} of {{ devos.length }}
            </div>

            <div v-if="currentUser && currentUser.id === plan.owner" class='thumb-action-icons-wrapper'>
              <a @click.prevent="editDevo(devo)" href="#">
                <i class="fas fa-pen-square"></i>
              </a>

              <a @click.prevent="deleteDevo(devo)" href="#">
                <i class="fas fa-trash"></i>
              </a>
            </div>
          </div>
        </div>
      </transition-group>
    </draggable>

    <div v-if="currentUser && currentUser.id === plan.owner" class="devo-form-wrapper">
      <button v-if="showNewDevoButton" @click="renderDevoForm" class="btn">Add a New Devo</button>
      <button v-if="!showNewDevoButton" @click="cancelDevoForm" class="btn">Cancel</button>
      <DevoForm v-if="showForm" :devoToEdit.sync="devoToEdit" :planId="plan.id" :devos="devos" @new="addToDevos" @update="updateDevoList" :key="devoFormKey" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import DevoForm from '@/components/devos/DevoForm';
import draggable from 'vuedraggable';

export default {
  name: 'PlanDetail',
  data() {
    return {
      plan: {
        name: null,
        summary: null,
        slug: this.$route.params.slug,
        id: null,
        owner: null,
        owner: null,
      },
      planStarted: null,
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
    DevoForm,
    draggable
  },
  beforeMount() {
    this.getPlanDetails();
  },
  mounted() {
    this.getCurrentUserPlans();
  },
  beforeRouteUpdate(to, from, next) {
    this.plan.slug = this.$route.params.slug
    next()
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  methods: {
    updatePosition() {
      console.log('Positions updated!!')
      axios
        .patch(`https://open-devos-api.herokuapp.com/devo_positions/${this.plan.slug}`,
        { devos: this.devos },
        {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(response.data);
          // this.errorSubmittingDevo = false;
          // this.devoSubmittedSuccessfully = true;
          // this.responseMessage = 'Your devo has been updated!';
          // this.$emit('update', response.data.devo);
          return response.data;
        })
        .catch(error => {
          console.log(error);
          // this.responseMessage = 'There was an error submitting the form, make sure you filled out all required fields.';
          // this.errorSubmittingDevo = true;
        })
    },
    getCurrentUserPlans() {
      axios
        .get('https://open-devos-api.herokuapp.com/plan_assignments',
        {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token'),
          }
        })
        .then(response => {
          console.log(response.data.plans);
          console.log(this.plan.id);
          response.data.plans.forEach(plan => {
            if (plan.id === this.plan.id) {
              this.planStarted = true;
            } else {
              this.planStarted = false;
            }
          })
        })
        .catch(error => {
          console.log(error);
        });
    },
    startPlan() {
      axios
        .post("https://open-devos-api.herokuapp.com/plan_assignments",
        {
          'plan_assignment': {
            'plan_id': this.plan.id,
            'user_id': this.currentUser.id
          }
        },
        {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token'),
          }
        })
        .then(response => {
          this.planStarted = true;
          // this.responseMessage = 'Your devo has been published!';

          console.log(response.data);
          return response.data;
        })
        .catch(error => {
          console.log(error);
          // this.responseMessage = 'There was an error submitting the form, make sure you filled out all required fields.';
          // this.errorSubmittingDevo = true;
        })
    },
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
      this.$swal({
        title: 'Are you sure you want to delete this devotional?',
        text: "This will permanently delete the devotional and you won't be able to get it back",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes Delete it!',
        cancelButtonText: 'No, Keep it!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if (result.value) {
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
              this.devoDeletionResponseMessage = 'The devotional was successfully deleted';
              return response.data;
            })
            .catch(error => {
              console.log(error);
              this.devoDeletionResponseMessage = 'There was an error deleting the devotional';
              this.errorDeletingDevo = true;
            })
          this.$swal('Deleted', 'You successfully deleted the devotional', 'success')
        } else {
          this.$swal('Cancelled', 'Your devotional is still intact!', 'info')
        }
      })
    },
    sortDevosByPosition(devos) {
      devos.sort((prev, next) => {
        return prev.position - next.position;
      })

      return devos;
    },
    getPlanDetails() {
      axios
        .get(`${this.planApiUrl}/${this.plan.slug}`)
        .then(response => {
          this.plan.name = response.data.plan.title;
          this.plan.summary = response.data.plan.summary;
          this.plan.id = response.data.plan.id;
          this.plan.owner = response.data.plan.user.id;
          this.devos.push(...response.data.plan.devos);
          this.devos = this.sortDevosByPosition(this.devos);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/plan_detail.scss';
</style>