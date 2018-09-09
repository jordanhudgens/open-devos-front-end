<template>
  <div class="notification">
    <div class="left-column">
      <div class="title">{{ title }}</div>

      <!--https://snipcart.com/blog/vuejs-transitions-animations  -->
      <div class="progress">
        {{ subtitle }}
      </div>
    </div>
    <div class="right-column">
      <router-link class="btn-clear" :to="{ name: routeName, params: { devo_slug: slug } }">
        {{ buttonText }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  data() {
    return {
    }
  },
  props: {
    title: String,
    subtitle: String,
    routeName: String,
    slug: String,
    buttonText: String,
  }
}
</script>

<style scoped lang="scss">
@import '../../styles/notification.scss';
</style>