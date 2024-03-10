<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { login } from '@/api/user/user'
import {encrypt} from "@/utils/aes";

const router = useRouter()
const userStore = useUserStore()

const loginForm = reactive({
  account: 'zhulibo',
  password: 'zhu022044',
})
const loginRule = reactive({
  account: [{ required: true, message: '请输入', trigger: 'blur' }],
  password: [{ required: true, message: '请输入', trigger: 'blur' }],
})
const loginFormRef = ref()

// 登录
const submitLoginForm = () => {
  loginFormRef.value?.validate(valid => {
    if(valid) {
      login({
        account: loginForm.account,
        password: encrypt(loginForm.password)
      })
        .then(res => {
          userStore.updateUserInfo(res.data)
          localStorage.setItem('userInfo', JSON.stringify(res.data))
          router.push({ path: '/home/dashboard' })
        })
    }
  })
}
</script>

<template>
  <div class="bg-ct">
    <div class="login-ct">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRule">
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" placeholder="账号" @keyup.enter="submitLoginForm"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="loginForm.password" @keyup.enter="submitLoginForm"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitLoginForm">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<style lang="pcss" scoped>
.bg-ct{
  overflow: hidden;
  height: 100%;
  background-color: #eee;
}
.login-ct{
  margin-top: 20vh;
  margin-left: 50vw;
  padding: 30px;
  width: 400px;
  border-radius: 10px;
  background-color: rgba(255,255,255,.8);
}
</style>
