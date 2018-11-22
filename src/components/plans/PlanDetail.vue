<template>
  <div class="plan-details-wrapper">
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
        <div v-if="currentUser && planStarted === null">
        </div>
        <div v-else-if="currentUser && !planStarted">
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

    <draggable v-model="devos" @end="updatePosition" v-if="ownerOnPage">
      <transition-group name="thumb-card-wrapper" class="thumb-card-wrapper">
        <div v-for="devo in devos" :key="devo.slug" class="animated-draggable-thumb-card" :id="devo.id">
          <router-link :to="{ name: 'DevoDetail', params: { devo_slug: devo.slug } }">
            <img v-if="devo.featured_image" :src="devo.featured_image" class="thumb-img">
            <img v-else src="@/assets/teal-placeholder.jpg" class="thumb-img">
          </router-link>

          <div class="thumb-card">
            <router-link :to="{ name: 'DevoDetail', params: { devo_slug: devo.slug } }">
              <span class="title">{{ devo.title }}</span>
            </router-link>

            <div v-if="positionsUpdated" class="dayCountDescription">
              Day {{ devo.position + 1 }} of {{ devos.length }}
            </div>

            <div v-else class="dayCountDescription">
              Updating...
            </div>

            <div class='thumb-action-icons-wrapper'>
              <router-link :to="{ name: 'DevoManager', params: { plan_slug: plan.slug, devo_slug: devo.slug } }">
                <i class="fas fa-pen-square"></i>
              </router-link>

              <a @click.prevent="deleteDevo(devo)" href="#">
                <i class="fas fa-trash"></i>
              </a>
            </div>
          </div>
        </div>
      </transition-group>
    </draggable>

    <div class="thumb-card-wrapper" v-else>
      <div v-for="devo in devos" :key="devo.slug" class="animated-draggable-thumb-card" :id="devo.id">
        <router-link :to="{ name: 'DevoDetail', params: { devo_slug: devo.slug } }">
          <img v-if="devo.featured_image" :src="devo.featured_image" class="thumb-img">
          <img v-else src="@/assets/teal-placeholder.jpg" class="thumb-img">
        </router-link>

        <div class="thumb-card">
          <router-link :to="{ name: 'DevoDetail', params: { devo_slug: devo.slug } }">
            <span class="title">{{ devo.title }}</span>
          </router-link>

          <div v-if="positionsUpdated" class="dayCountDescription">
            Day {{ devo.position + 1 }} of {{ devos.length }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentUser && currentUser.id === plan.owner" class="devo-form-wrapper">
      <router-link :to="{ name: 'DevoManager', params: { plan_slug: plan.slug, devo_slug: 'new' } }">
        <button class="btn">Add a New Devo</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
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
      },
      planStarted: null,
      planApiUrl: 'https://open-devos-api.herokuapp.com/plans',
      devos: [],
      errorDeletingDevo: false,
      devoDeletedSuccessfully: false,
      devoDeletionResponseMessage: null,
      devoToEdit: null,
      showNewDevoButton: true,
      positionsUpdated: true,
      ownerOnPage: false,
    };
  },

  components: {
    draggable,
  },

  beforeMount() {
    this.getPlanDetails();
    this.getCurrentUserPlans();
  },

  beforeRouteUpdate(to, from, next) {
    this.plan.slug = this.$route.params.slug;
    next();
  },

  computed: {
    ...mapGetters(['currentUser'])
  },

  methods: {
    updatePosition(event) {
      this.positionsUpdated = false;
      const updatedPositions = [];

      for (var i = 0; i < event.target.children.length; i++) {
        updatedPositions.push(event.target.children[i].id);
      }

      axios
        .patch(
        `https://open-devos-api.herokuapp.com/devo_positions/${this.plan.slug}`,
        { devos: updatedPositions },
        { withCredentials: true }
        )
        .then(response => {
          this.devos = response.data.devos;
          this.positionsUpdated = true;
          return response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    getCurrentUserPlans() {
      axios
        .get('https://open-devos-api.herokuapp.com/plan_assignments', {
          withCredentials: true
        })
        .then(response => {
          console.log("plan assignments", response.data.plans);
          console.log("current plan", this.plan);

          for (let plan of response.data.plans) {
            if (plan.id === this.plan.id) {
              console.log("I'm true!!!", plan.id, this.plan.id);
              this.planStarted = true;
              break;
            } else {
              console.log("I'm false!!!", plan.id, this.plan.id);
              this.planStarted = false;
            }
          }

        })
        .catch(error => {
          console.log(error);
        });
    },

    startPlan() {
      axios
        .post(
        'https://open-devos-api.herokuapp.com/plan_assignments',
        {
          plan_assignment: {
            plan_id: this.plan.id,
            user_id: this.currentUser.id,
          },
        },
        { withCredentials: true },
      )
        .then(response => {
          this.planStarted = true;
          return response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    deleteDevo(devo) {
      this.$swal({
        title: 'Are you sure you want to delete this devotional?',
        text:
        "This will permanently delete the devotional and you won't be able to get it back",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes Delete it!',
        cancelButtonText: 'No, Keep it!',
        showCloseButton: true,
        showLoaderOnConfirm: true,
      }).then(result => {
        if (result.value) {
          axios
            .delete(`https://open-devos-api.herokuapp.com/devos/${devo.slug}`, { withCredentials: true })
            .then(response => {
              this.errorDeletingDevo = false;
              this.devoDeletedSuccessfully = true;
              this.devos = this.devos.filter(el => el.slug !== devo.slug);
              this.devoDeletionResponseMessage =
                'The devotional was successfully deleted';
              return response.data;
            })
            .catch(error => {
              console.log(error);
              this.devoDeletionResponseMessage =
                'There was an error deleting the devotional';
              this.errorDeletingDevo = true;
            });
          this.$swal(
            'Deleted',
            'You successfully deleted the devotional',
            'success',
          );
        } else {
          this.$swal('Cancelled', 'Your devotional is still intact!', 'info');
        }
      });
    },

    sortDevosByPosition(devos) {
      devos.sort((prev, next) => {
        return prev.position - next.position;
      });

      return devos;
    },

    getPlanDetails() {
      axios
        .get(`${this.planApiUrl}/${this.plan.slug}`, { withCredentials: true })
        .then(response => {
          this.plan.name = response.data.plan.title;
          this.plan.summary = response.data.plan.summary;
          this.plan.id = response.data.plan.id;
          this.plan.owner = response.data.plan.user.id;
          this.devos.push(...response.data.plan.devos);
          this.devos = this.sortDevosByPosition(this.devos);

          if (this.currentUser.id === this.plan.owner) {
            this.ownerOnPage = true;
          }

          return response;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
};
</script>