<template>
  <div>
    <h1>{{ formTitle }}</h1>
    <DevoForm :devoToEdit.sync="devo" :planId="devo.plan.id" @new="addToDevos" @update="updateDevoList" />
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from "vuex";
import DevoForm from '@/components/devos/DevoForm';

// TODOs
// Get the plan id
// It's needed because the devo object is empty for new devos
// You now have access to it in the route plan_slug


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
    addToDevos() {
      console.log("Adding to devos");
      // Redirect to plan detail
    },

    updateDevoList() {
      console.log("updating...");
      // Redirect to plan detail
      // Combine these
    },

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