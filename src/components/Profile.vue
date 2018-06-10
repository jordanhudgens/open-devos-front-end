<template>
  <div>
    <h1>Profile</h1>

    <h2>{{ profileSlug }}</h2>

    <!-- <div v-for="plan in profilePlans" :key="plan.id">

                  </div> -->
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      profilePlans: null,
      profileSlug: null,
    }
  },
  created() {
    this.profileSlug = this.$route.params.user_slug
  }
}
</script>

<style scoped>

</style>