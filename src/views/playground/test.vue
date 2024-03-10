<script setup>
import {ref} from "vue";
import Child from "@/views/playground/components/Child.vue";

const childRef = ref()
const callChild = () => {
  console.log(childRef.value.a)
  childRef.value.fn()
}

const doXhr = () => {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText)
    }
  }
  xhr.open('post', 'http://localhost:3000/common/uploadFile', true)
  xhr.send()
}
const doFetch = () => {
  fetch('http://localhost:3000/common/uploadFile', {
    method: 'post'
  })
  .then(res => {return res.json()})
  .then(res => {
    console.log(res);
  })
}
</script>

<template>
  <div class="wrapper">
    <el-button type="primary" plain @click="callChild">callChild</el-button>
    <Child ref="childRef"></Child>
    <hr>

    <el-button type="primary" plain @click="doXhr">xhr</el-button>
    <el-button type="primary" plain @click="doFetch">fetch</el-button>
    <hr>

  </div>
</template>

<style lang="pcss" scoped>
hr{
  margin: 10px 0;
}
</style>
