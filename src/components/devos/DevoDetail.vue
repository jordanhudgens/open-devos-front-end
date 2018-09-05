<template>
  <div class="devo-detail-wrapper">
    <div class="heading">
      <h1>{{ devo.name }}</h1>

      <div class="mark-completed-wrapper">
        <button v-if="!devoCompletions.includes(devo.id)" @click="markCompleted(devo.id)" class="btn">Mark Completed</button>
        <button v-else @click="markNotCompleted(devo.id)" class="btn-warning">Devo Completed</button>
      </div>
    </div>

    <div v-if="!devo.name" class="spinner-wrapper">
      <i class="fas fa-circle-notch fa-spin fa-3x fa-fw"></i>
    </div>

    <div class="returned-content" v-html="devo.content"></div>
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
        content: null
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
    ...mapGetters({ currentUser: "currentUser" })
  },
  methods: {
    markCompleted(devo_id) {
      console.log('Marking completedl...', devo_id);
      axios
        .post("https://open-devos-api.herokuapp.com/devo_completions",
        {
          devo_completion: {
            devo_id: this.devo.id,
            user_id: this.currentUser.id
          }
        },
        {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token'),
          }
        })
        .then(response => {
          // this.responseMessage = 'Your devo has been published!';
          console.log('Response data', response.data);
          return response.data;
        })
        .catch(error => {
          console.log(error);
          // this.responseMessage = 'There was an error submitting the form, make sure you filled out all required fields.';
        })
    },
    getUserDevoCompletions() {
      if (this.currentUser) {
        axios
          .get(`https://open-devos-api.herokuapp.com/devo_completions?user_id=${this.currentUser.id}`,
          {
            headers: {
              "Authorization": 'Bearer ' + localStorage.getItem('token'),
            }
          })
          .then(response => {
            console.log(response.data);
            this.devoCompletions.push(...response.data);
            console.log(this.devoCompletions);
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

<style lang="scss">
@import '../../styles/devo_detail.scss';
@import '../../styles/media-queries.scss';
</style>