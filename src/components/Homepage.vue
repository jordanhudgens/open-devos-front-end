<template>
  <div class="homepage">

    <notification v-if="lastPlan.title" :title="lastPlan.title" :subtitle="`Lesson ${lastPlan.currentDevo.position + 1 } of ${lastPlan.devoCount}`" routeName="DevoDetail" :slug="lastPlan.currentDevo.slug" buttonText="Continue" />

    <div class="homepage-wrapper">
      <div class="left-column">

        <div class="two-column-grid">
          <div v-for="plan in randomPlans" :key="plan.id" class="single-card-wrapper">
            <router-link :to="{ name: 'PlanDetail', params: { slug: plan.slug } }">
              <img v-if="plan.featured_image" :src="plan.featured_image" class="thumb-img">
              <img v-else src="@/assets/teal-placeholder.jpg" class="thumb-img">
            </router-link>

            <div class="thumb-card">
              <router-link :to="{ name: 'PlanDetail', params: { slug: plan.slug } }">
                <span class="title">{{ plan.title }}</span>
              </router-link>
            </div>
          </div>
        </div>

        <div class="spacer40"></div>

        <div class="one-column-grid">
          <div class="card">
            <div class="plan-list-wrapper">

              <div v-for="plan in recentPlans" :key="plan.id" class="plan-list-item">
                <div class="left-column">
                  <div class="link">
                    <router-link :to="{ name: 'PlanDetail', params: { slug: plan.slug } }">
                      <span class="title">{{ plan.title }}</span>
                    </router-link>
                  </div>

                  <div class="plan-details">
                    <span class="topic">
                      {{ plan.topic.title }}
                    </span>

                    <span class="plan-detail-item">
                      Last published {{ formatDate(plan.last_published) }}
                    </span>

                    <span class="plan-detail-item">
                      {{ plan.devos.length }} lessons
                    </span>
                  </div>
                </div>

                <div class="right-column">
                  <a class="vueLink" v-if="userLoggedIn" v-on:click="handleBookmarkClick($event, plan.id)">
                    <i v-if="planIdBookmarks.map(bookmark => bookmark.plan_id).includes(plan.id)" class="fas fa-bookmark"></i>
                    <i v-else class="far fa-bookmark"></i>
                  </a>

                  <router-link :to="{ name: 'PlanDetail', params: { slug: plan.slug } }">
                    <i class="far fa-play-circle"></i>
                  </router-link>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      <div class="right-column">
        <div class="authors-wrapper">
          <div v-for="author in authors" :key="author.id" class="author">
            <pre>{{ author }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import moment from "moment";
import Notification from '@/components/shared/Notification';

export default {
  name: 'Homepage',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  components: {
    'notification': Notification
  },
  mounted() {
    this.getRandomPlans();
    this.getRecentPlans();
    this.loggedIn();
    this.getAuthors();

    if (this.userLoggedIn) {
      this.getLastPlan();
      this.getBookmarks();
    }
  },
  data() {
    return {
      lastPlan: {
        title: null,
        slug: null,
        devoCount: null,
        currentDevo: null
      },
      randomPlans: [],
      recentPlans: [],
      planIdBookmarks: [],
      userLoggedIn: null,
      authors: []
    }
  },
  methods: {
    loggedIn() {
      if (localStorage.getItem("token")) {
        axios
          .get("https://open-devos-api.herokuapp.com/logged_in", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(response => {
            if (response.data.logged_in === true) {
              console.log(response.data);
              this.userLoggedIn = true;
              return true;
            } else {
              this.userLoggedIn = false;
              return false;
            }
          })
          .catch(error => {
            this.userLoggedIn = false;
            return false;
          });
      } else {
        this.userLoggedIn = false;
        return false;
      }
    },
    handleBookmarkClick(e, planId) {
      if (this.planIdBookmarks.length === 0) {
        this.addBookmark(e, planId);
      }

      if (e.target.className === "fas fa-bookmark") {
        let bookmarkId = null;

        this.planIdBookmarks.forEach(planIdBookmark => {
          if (planIdBookmark.plan_id === planId) {
            bookmarkId = planIdBookmark.bookmark_id;
          }
        })

        this.removeBookmark(e, bookmarkId);
      } else {
        this.addBookmark(e, planId);
      }

    },
    getBookmarks() {
      axios
        .get(`https://open-devos-api.herokuapp.com/bookmarks?user_id=${this.currentUser.id}`,
        {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token'),
          }
        })
        .then(response => {
          this.planIdBookmarks = response.data.bookmarks.map(bookmark => ({ plan_id: bookmark.plan.id, bookmark_id: bookmark.id }));
        })
        .catch(error => {
          console.log(error);
        });
    },
    addBookmark(e, id) {
      axios
        .post("https://open-devos-api.herokuapp.com/bookmarks",
        {
          'bookmark': {
            'plan_id': id,
            'user_id': this.currentUser.id
          }
        },
        {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token'),
          }
        })
        .then(response => {
          this.planIdBookmarks.push({ plan_id: response.data.bookmark.plan.id, bookmark_id: response.data.bookmark.id });
          e.target.className = "fas fa-bookmark";

          return response.data;
        })
        .catch(error => {
          console.log(error);
          // this.responseMessage = 'There was an error submitting the form, make sure you filled out all required fields.';
          // this.errorSubmittingDevo = true;
        })
    },
    removeBookmark(e, id) {
      axios
        .delete(`https://open-devos-api.herokuapp.com/bookmarks/${id}`,
        {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          this.planIdBookmarks.forEach(planIdBookmark => {
            if (planIdBookmark.bookmark_id === id) {
              let i = this.planIdBookmarks.indexOf(planIdBookmark);
              if (i != -1) {
                this.planIdBookmarks.splice(i, 1);
              }
            }
          })

          e.target.className = "far fa-bookmark";
          return response.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    formatDate(date) {
      return moment(date).fromNow();
    },
    getAuthors() {
      axios
        .get('https://open-devos-api.herokuapp.com/authors')
        .then(response => {
          this.authors.push(...response.data.users);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getRandomPlans() {
      axios
        .get('https://open-devos-api.herokuapp.com/random_plans')
        .then(response => {
          this.randomPlans.push(...response.data.plans);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getRecentPlans() {
      axios
        .get('https://open-devos-api.herokuapp.com/plans')
        .then(response => {
          this.recentPlans.push(...response.data.plans);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getLastPlan() {
      axios
        .get('https://open-devos-api.herokuapp.com/last-plan',
        {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token'),
          }
        })
        .then(response => {
          if (response.data.plan_assignment) {
            const { title, slug } = response.data.plan_assignment.plan;
            const devo_count = response.data.plan_assignment.devo_count;
            const current_devo = response.data.plan_assignment.devo;
            this.lastPlan.title = title;
            this.lastPlan.slug = slug;
            this.lastPlan.currentDevo = current_devo;
            this.lastPlan.devoCount = devo_count;
          } else {
            console.log('No plans yet!')
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
}
</script>

<style scoped lang="scss">
@import './../styles/grid.scss';
@import './../styles/homepage.scss';
@import './../styles/card.scss';
@import './../styles/helpers.scss';
@import './../styles/media-queries.scss';
</style>
