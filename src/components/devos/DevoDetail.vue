<template>
  <div class="devo-detail-wrapper">
    <h1>{{ devo.name }}</h1>

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
@import url('https://fonts.googleapis.com/css?family=Merriweather');

.devo-detail-wrapper {
  padding-left: 80px;
  padding-right: 80px;
}

.returned-content {
  font-family: 'Merriweather', serif;
}

.returned-content img {
  width: 100%;
}
</style>