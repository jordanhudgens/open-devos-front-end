<template>
  <div>
    <h1>Publish</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
  }
}
</script>

<style scoped>

</style>