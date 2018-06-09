<template>
  <div class="homepage-wrapper">
    <h1>Welcome to Open Devos, your home for discovering and publishing daily devotionals</h1>

    <div v-if="currentUser">
      {{ currentUser.email }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Homepage',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
.homepage-wrapper {}
</style>
