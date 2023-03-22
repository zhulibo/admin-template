<script setup lang="ts">
import dayjs from "dayjs";
import {ref} from "vue";

const dateStr = ref<string>()
dateStr.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
</script>

<template>
  <p>dashboard</p>
  <p>{{dateStr}}</p>
</template>

<style lang="pcss" scoped>
</style>
