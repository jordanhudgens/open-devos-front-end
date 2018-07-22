<template>
  <div class="homepage-wrapper">
    <div class="notification">
      <div class="left-column">
        <h1>Daily Living</h1>

        <div class="progress">
          Lesson 2 of 8
        </div>
      </div>
      <!--TODO Finish homepage  -->

      <div class="right-column">
        <router-link :to="{ name: 'Homepage' }">
          Continue
        </router-link>
      </div>
    </div>

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

<style scoped lang="scss">
$teal: #156356;

.notification {
  border-radius: 8px;
  background-color: $teal;
  padding: 5px 20px 20px 20px;
  display: flex;
  justify-content: space-between;
  align-content: center;

  .right-column {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    a {
      color: white;
    }
  }
}
</style>
