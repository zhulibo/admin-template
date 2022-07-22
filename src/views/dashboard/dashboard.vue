<script setup lang="ts">
import { useMousePosition } from "@/hooks/useMousePosition"
import { deepCopy } from 'js-fragment'

// let msg = defineProps({
//   msg: {}
// })
// const { x, y } = useMousePosition()

const obj = {
  name: '小明',
  age: 18
}
const newObj = deepCopy(obj)
</script>

<template>
  <div class="wrapper">dashboard</div>
  <!--  <p>{{msg}}</p>-->
  <!--  <p>{{x}}</p>-->
  <!--  <p>{{y}}</p>-->
  {{newObj}}
</template>

<style scoped>
</style>
