<template>
  <div>
    <h1>{{ devoName }}</h1>

    <div>
      {{ devoContent }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
          this.devoContent = response.data.devo.content;
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