<template>
  <div>
    <h1>{{ formTitle }}</h1>
    <!-- <DevoForm :devoToEdit.sync="devoToEdit" :planId="plan.id" :devos="devos" @new="addToDevos" @update="updateDevoList" :key="devoFormKey" /> -->
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from "vuex";
import DevoForm from '@/components/devos/DevoForm';

// TODOs
// If the slug is 'new' render a new devo form
// If the slug is anything else, lookup the devo and populate the edit form

export default {
  name: 'DevoManager',

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
    if (this.devo.slug !== 'new') {
      this.getDevoDetails();
    }
  },

  computed: {
    ...mapGetters({ currentUser: "currentUser" }),

    formTitle: function() {
      if (this.devo.slug === 'new') {
        return "Create a new devo";
      } else {
        return this.devo.name;
      }
    }
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