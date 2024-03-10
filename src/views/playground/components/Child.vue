<script setup>
import {ref} from "vue";

const a = ref(123)
const fn = () => {
  console.log('fn')
}

defineExpose({
  a,
  fn
})
</script>

<template>
  <div class="a">
  </div>
</template>

<style lang="pcss" scoped>
.a{
  width: 100px;
  height: 20px;
  background-color: #ddd;
}
</style>
