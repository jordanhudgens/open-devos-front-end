<template>
  <div>
    <h1>{{ devoName }}</h1>

    <div v-html="devoContent"></div>
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
    console.log("params...", this.$route.params);

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
          console.log(response);
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