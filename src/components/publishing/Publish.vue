<template>
  <div>
    <h1>Publish</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'Publish',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  beforeMount() {
    console.log(this.currentUser.id);
    this.getCurrentPlans()
  },
  methods: {
    getCurrentPlans() {
      axios.get('https://open-devos-api.herokuapp.com/user-plans',
        {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token')
          }
        }).then((data) => {
          console.log('data comming', data);
        }).catch((error) => {
          console.log('error comming', error);
        });
    }
  }
}
</script>

<style scoped>

</style>