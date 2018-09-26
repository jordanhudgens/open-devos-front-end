<template>
  <div class="file-select-wrapper">
    <label class="file-select">
      <div class="select-button">
        <span v-if="value">Selected File: {{value.name}}</span>
        <span v-else>Select File</span>
      </div>
      <input type="file" @change="handleFileChange" />
    </label>
  </div>
</template>

<script>
export default {
  props: {
    value: File,
  },

  methods: {
    handleFileChange(e) {
      this.$emit('input', e.target.files[0]);
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../styles/forms.scss';
</style>
