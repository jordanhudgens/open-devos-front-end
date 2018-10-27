<template>
  <div>
    <h1>Edit Devo</h1>
    <h2>
      {{ devoSlug }}
    </h2>
  </div>
</template>

<script>
export default {
  name: 'EditDevo',

  data() {
    return {
      devoSlug: this.$route.params.devo_slug
    }
  },

}
</script>