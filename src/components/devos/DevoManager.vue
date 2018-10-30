<template>
  <div>
    <h1>{{ formTitle }}</h1>
    <DevoForm :devoToEdit.sync="devo" :planId="plan.id" @new="addToDevos" @update="updateDevoList" />
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from "vuex";
import DevoForm from '@/components/devos/DevoForm';

export default {
  name: 'DevoManager',

  data() {
    return {
      devo: {
        id: null,
        title: null,
        slug: this.$route.params.devo_slug,
        content: null,
        featuredImage: null
      },
      plan: {},
      devoApiUrl: 'https://open-devos-api.herokuapp.com/devos',
      planApiUrl: `https://open-devos-api.herokuapp.com/plans/${this.$route.params.plan_slug}`
    }
  },

  components: {
    DevoForm
  },

  beforeMount() {
    if (this.devo.slug !== 'new') {
      this.getDevoDetails();
    }

    this.getPlan();
  },

  computed: {
    ...mapGetters({ currentUser: "currentUser" }),

    formTitle: function() {
      if (this.devo.slug === 'new') {
        return "Create a new devo";
      } else {
        return this.devo.title;
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

    getPlan() {
      axios
        .get(this.planApiUrl)
        .then(response => {
          this.plan = response.data.plan;
        })
        .catch(error => {
          console.log(error);
        });
    },

    getDevoDetails() {
      axios
        .get(`${this.devoApiUrl}/${this.devo.slug}`)
        .then(response => {
          console.log("Response from getDevoDetails", response);
          this.devo.id = response.data.devo.id;
          this.devo.title = response.data.devo.title;
          this.devo.featuredImage = response.data.devo.featured_image;
          this.devo.content = response.data.devo.content;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>