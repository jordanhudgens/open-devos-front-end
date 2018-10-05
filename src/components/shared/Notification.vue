<template>
  <div :class="'notification ' + alertClass">
    <div class="left-column">
      <div class="title">{{ title }}</div>
    </div>
    <div class="right-column">
      <div class="two-columns">
        <div class="progress">
          {{ subtitle }}
        </div>
        <router-link class="btn-clear btn-sm" :to="{ name: routeName, params: { devo_slug: slug } }">
          {{ buttonText }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  data() {
    return {
      alertClass: 'notification-start',
    };
  },
  props: {
    title: String,
    subtitle: String,
    routeName: String,
    slug: String,
    buttonText: String,
  },
  mounted() {
    setTimeout(() => {
      this.alertClass = 'notification-end';
    }, 2000);
  },
};
</script>

<style scoped lang="scss">
@import '../../styles/notification.scss';
@import '../../styles/media-queries.scss';
</style>
