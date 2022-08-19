<script setup lang="ts">
import {ref} from 'vue'
import type {Msg} from "@/views/playground/type";
import dayjs from "dayjs";

const msgList = ref<Msg[]>([])
const ws = new WebSocket('ws://localhost:3000/webSocket')
// 连接成功事件
ws.onopen = () => {
  console.log('连接成功')
}
ws.onerror = () => {
  console.log('连接失败')
}
ws.onclose = () => {
  console.log('连接关闭')
}

ws.onmessage = res => {
  console.log('收到信息', res)
  const data = JSON.parse(res.data)
  msgList.value.push({
    type: data.type,
    userName: data.userName,
    msg: data.msg,
    time: data.time
  })
}

const msg = ref('')
const sendMsg = () => {
  ws.send(msg.value)
  msgList.value.push({
    type: 1,
    userName: 'you',
    msg: msg.value,
    time: dayjs().format('YYYY-MM-DD HH:mm:ss')
  })
  msg.value = ''
}
</script>

<template>
  <div class="wrapper">
    <ul class="msg-list">
      <li v-for="item in msgList" :key="item.time" class="item" :class="item.type === 1 ? 'user' : 'server'">
        <p class="name">{{item.userName}}</p>
        <p class="msg">{{item.msg}}</p>
      </li>
    </ul>
    <div class="ct">
      <el-input v-model="msg" placeholder="请输入" style="width: 300px;"/>
      <el-button type="primary" plain @click="sendMsg" style="margin-left: 10px;">发送</el-button>
    </div>
  </div>
</template>

<style lang="pcss" scoped>
.msg-list{
  width: 600px;
  height: 400px;
  background-color: #f5f5f5;
  @mixin scrollBar;
  & .item{
    margin-top: 20px;
    display: flex;
    & .name{
      display: inline-block;
    }
    & .msg{
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 0;
    }
  }
  & .user{
    text-align: right;
  }
}
.ct{
  width: 600px;
  margin-top: 20px;
  text-align: right;
}
</style>
