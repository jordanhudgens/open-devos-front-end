<template>
  <div class="devo-detail-wrapper">
    <h1>{{ devoName }}</h1>

    <div class="returned-content" v-html="devoContent"></div>
  </div>
</template>

<script>
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';

export default {
  name: 'DevoDetail',
  data() {
    return {
      devoName: null,
      devoSlug: this.$route.params.devo_slug,
      devoApiUrl: 'https://open-devos-api.herokuapp.com/devos',
      devoContent: null
    }
  },
  beforeMount() {
    this.getDevoDetails();
  },
  beforeRouteUpdate(to, from, next) {
    this.devoSlug = this.$route.params.devo_slug
    next()
  },
  methods: {
    getDevoDetails() {
      axios
        .get(`${this.devoApiUrl}/${this.devoSlug}`)
        .then(response => {
          this.devoName = response.data.devo.title;
          this.devoContent = sanitizeHtml(response.data.devo.content, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2'])
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
</style>