<script setup lang="ts">
import { ref, reactive } from "vue"
import { useRouter, useRoute } from "vue-router";
import imgUpload from '@/components/fileUpload/imgUpload.vue'
import richText from '@/components/richText/index.vue'
import { goBack } from "@/hooks";
import { getNewsDetail, editNews, addNews } from "@/api/news/news";
import {ElMessage} from 'element-plus'
import type {FormInstance} from 'element-plus'
import type {News} from "@/api/news/type";

const router = useRouter()
const route = useRoute()

const id = route.query.id as unknown as number

// 获取新闻详情
const getNewsDetailHandle = () => {
  getNewsDetail(id)
    .then(res => {
      for (const key in newsForm) {
        newsForm[key as keyof typeof newsForm] = res.data[key as keyof typeof newsForm]
      }
    })
}

if(id) {
  getNewsDetailHandle()
}

const newsForm = reactive<News>({
  title: '',
  type: '',
  status: '',
  imgUrl: '',
  content: ''
})
const newsRules = {
  title: [{ required: true, message: '请输入', trigger: 'blur' }],
  imgUrl: [{ required: true, message: '请输入', trigger: 'blur' }],
  content: [{ required: true, message: '请输入', trigger: 'blur' }]
}
const newsFormRef = ref<FormInstance>()

// 提交表单
const submitNewsForm = () => {
   newsFormRef.value?.validate(valid => {
     if(valid) {
       if(id) { // 编辑
         newsForm.id = id
         editNews(newsForm)
           .then(res => {
             ElMessage.success(res.msg)
             router.push({path: 'newsList'})
           })
       }else{ // 新闻
         addNews(newsForm)
           .then(res => {
             ElMessage.success(res.msg)
             router.push({path: 'newsList'})
           })
       }
     }
   })
}
</script>

<template>
  <div class="wrapper">
    <div class="page-head">
      <el-page-header title="返回" :content="route.meta.title" @back="goBack" />
      <div class="r"></div>
    </div>
    <div class="news-edit">
      <el-form ref="newsFormRef" :model="newsForm" :rules="newsRules">
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题" prop="title">
              <el-input v-model="newsForm.title" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="type" prop="type">
              <el-input v-model="newsForm.type" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="status" prop="status">
              <el-input v-model="newsForm.status" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="图片" prop="imgUrl">
              <imgUpload v-model="newsForm.imgUrl" :limit="5"></imgUpload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容" prop="content">
              <richText v-model="newsForm.content"></richText>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="submitNewsForm">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
    </div>
  </div>
</template>

<style lang="pcss" scoped>
</style>
