<template>
  <div>
    <h1>{{ devo.name }}</h1>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from "vuex";

export default {
  name: 'EditDevo',

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
      devoApiUrl: 'https://open-devos-api.herokuapp.com/devos',
    }
  },

  beforeMount() {
    this.getDevoDetails();
  },

  computed: {
    ...mapGetters({ currentUser: "currentUser" })
  },

  methods: {
    getDevoDetails() {
      axios
        .get(`${this.devoApiUrl}/${this.devo.slug}`)
        .then(response => {
          console.log("Response", response);
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