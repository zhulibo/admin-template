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
  <p v-drag>123</p>
</template>

<style scoped>
p{
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100px;
  height: 100px;
  cursor: pointer;
  background-color: #ccc;
}
</style>
