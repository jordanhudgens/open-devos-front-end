<template>
  <div class="thumb-card-wrapper">
    <div v-for="element in collection" :key="element.id">
      <router-link :to="{ name: routeName, params: { slug: element.slug } }">
        <img v-if="element.featured_image" :src="element.featured_image" class="thumb-img">
        <img v-else src="@/assets/teal-placeholder.jpg" class="thumb-img">
      </router-link>

      <div class="thumb-card">
        <router-link :to="{ name: routeName, params: { slug: element.slug } }">
          <span v-if="element.status === 'published'" class="title">{{ element.title }}</span>
          <span v-else class="title">
            <span class='draft-label'>Draft</span> {{ element.title }}
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThumbCards',
  data() {
    return {
    }
  },
  props: {
    collection: Array,
    routeName: String,
  }
}
</script>

<style lang="scss">
@import '../../styles/helpers.scss';
</style>
