<script setup>
import Line from './chart/Line.vue'
import Bar from './chart/Bar.vue'
import Pie from './chart/Pie.vue'
</script>

<template>
  <div class="wrapper">
    <div class="ct">
      <div class="l">
        <Line></Line>
      </div>
      <div class="m">
        <Bar></Bar>
      </div>
      <div class="r">
        <Pie></Pie>
      </div>
    </div>
  </div>
</template>

<style lang="pcss" scoped>
.ct{
  display: flex;
  flex-wrap: wrap;
  &>div{
    box-sizing: border-box;
    padding: 10px;
  }
  & .l{
    width: 50%;
  }
  & .m{
    width: 50%;
  }
  & .r{
    width: 50%;
  }
}
</style>
