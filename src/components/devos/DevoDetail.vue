<template>
  <div class="devo-detail-wrapper">
    <h1>{{ devo.name }}</h1>

    <div v-if="!devo.name" class="spinner-wrapper">
      <i class="fas fa-circle-notch fa-spin fa-3x fa-fw"></i>
    </div>

    <div class="returned-content" v-html="devo.content"></div>
  </div>
</template>

<script>
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';

export default {
  name: 'DevoDetail',
  data() {
    return {
      devo: {
        name: null,
        slug: this.$route.params.devo_slug,
        content: null
      },
      devoApiUrl: 'https://open-devos-api.herokuapp.com/devos',
    }
  },
  beforeMount() {
    this.getDevoDetails();
  },
  beforeRouteUpdate(to, from, next) {
    this.devo.slug = this.$route.params.devo_slug
    next()
  },
  methods: {
    getDevoDetails() {
      axios
        .get(`${this.devoApiUrl}/${this.devo.slug}`)
        .then(response => {
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
</style>