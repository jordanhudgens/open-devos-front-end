<template>
  <div class="devo-detail-wrapper">
    <div class="devo-detail-content">
      <div class="heading">
        <div class="left-column">
          <h1>{{ devo.name }}</h1>

          <div v-if="currentUser && currentUser.id === devo.plan.user_id" class="devo-edit-action-link">
            <router-link :to="{ name: 'DevoManager', params: { plan_slug: devo.plan.slug, devo_slug: devo.slug } }">
              <i class="fas fa-pen-square"></i>
              Edit
            </router-link>
          </div>
        </div>

        <div class="mark-completed-wrapper">
          <button v-if="currentUser && !devoCompletions.includes(devo.id) && devo.plan" @click="markCompleted(devo.id)" class="btn">Mark Completed</button>
          <button v-else-if="currentUser && devoCompletions.includes(devo.id) && devo.plan" @click="markNotCompleted(devo.id)" class="btn-warning">Devo Completed</button>

          <router-link v-if="devo.plan" :to="{ name: 'PlanDetail', params: { slug: devo.plan.slug } }" class="">
            {{ devo.plan.title }}
          </router-link>
        </div>
      </div>

      <div v-if="!devo.name" class="spinner-wrapper">
        <i class="fas fa-circle-notch fa-spin fa-3x fa-fw"></i>
      </div>

      <div v-if="devo.featuredImage">
        <div class="devo-featured-image-wrapper">
          <img :src="devo.featuredImage">
        </div>
      </div>

      <div class="returned-content" v-html="devo.content"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';
import { mapGetters } from "vuex";

export default {
  name: 'DevoDetail',

  data() {
    return {
      devo: {
        id: null,
        name: null,
        slug: this.$route.params.devo_slug,
        content: null,
        plan: null,
        featuredImage: null
      },
      devoCompletions: [],
      devoApiUrl: 'https://open-devos-api.herokuapp.com/devos',
    }
  },

  beforeMount() {
    this.getDevoDetails();
    this.getUserDevoCompletions();
  },

  beforeRouteUpdate(to, from, next) {
    this.devo.slug = this.$route.params.devo_slug
    next()
  },

  computed: {
    ...mapGetters([
      "currentUser"
    ])
  },

  methods: {
    markCompleted(devo_id) {
      axios
        .post("https://open-devos-api.herokuapp.com/devo_completions",
        {
          devo_completion: {
            devo_id: this.devo.id,
            user_id: this.currentUser.id
          }
        },
        {
          withCredentials: true
        })
        .then(response => {
          this.$router.push({
            name: "PlanDetail",
            params: { slug: response.data.plan.slug }
          });

          return response.data;
        })
        .catch(error => {
          console.log(error);
        })
    },

    markNotCompleted(devo_id) {
      axios
        .delete(`https://open-devos-api.herokuapp.com/devo_completions/${devo_id}`, {
          withCredentials: true
        })
        .then(response => {
          this.devoCompletions = this.devoCompletions.filter(el => el !== devo_id);
          return response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    getUserDevoCompletions() {
      if (this.currentUser) {
        axios
          .get(`https://open-devos-api.herokuapp.com/devo_completions?user_id=${this.currentUser.id}`,
          {
            withCredentials: true
          })
          .then(response => {
            this.devoCompletions.push(...response.data);
            return response.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    getDevoDetails() {
      axios
        .get(`${this.devoApiUrl}/${this.devo.slug}`)
        .then(response => {
          this.devo.id = response.data.devo.id;
          this.devo.name = response.data.devo.title;
          this.devo.plan = response.data.devo.plan;
          this.devo.featuredImage = response.data.devo.featured_image;
          this.devo.content = sanitizeHtml(response.data.devo.content, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'img', 'div', 'a']),
            allowedSchemes: ['data', 'http']
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>