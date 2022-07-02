<script setup>
const props = defineProps({
  className: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
})
</script>

<template>
  <svg class="svg-icon" :class="className" aria-hidden="true">
    <use :href="'#icon-' + name"></use>
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.16em;
  fill: currentColor;
  overflow: hidden;
}
</style>
