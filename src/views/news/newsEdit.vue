<script setup lang="ts">
import { ref, reactive } from "vue"
import { useRouter, useRoute } from "vue-router";
import ImgUpload from '@/components/fileUpload/ImgUpload.vue'
import RichText from '@/components/richText/RichText.vue'
import { goBack } from "@/hooks";
import { getNewsDetail, editNews, addNews } from "@/api/news/news";
import {ElMessage} from 'element-plus'
import type {FormInstance, FormRules} from 'element-plus'
import type {News} from "@/api/news/type";

const router = useRouter()
const route = useRoute()

const id = route.query.id as unknown as number

// 获取新闻详情
const getNewsDetailHandle = () => {
  getNewsDetail(id)
    .then(res => {
      for (const key in newsForm) {
        newsForm[key as keyof typeof newsForm] = res.data[key as keyof typeof newsForm] // todo
      }
    })
}

if(id) {
  getNewsDetailHandle()
}

const newsForm = reactive<News>({
  title: '',
  imgUrl: '',
  content: '',
  type: 0,
  status: 0,
})
const newsRules = reactive<FormRules>({
  title: [{ required: true, message: '请输入', trigger: 'blur' }],
  imgUrl: [{ required: true, message: '请输入', trigger: 'blur' }],
  content: [{ required: true, message: '请输入', trigger: 'blur' }]
})
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
      <el-form ref="newsFormRef" :model="newsForm" :rules="newsRules" label-width="auto">
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
            <el-form-item label="状态" prop="status">
              <el-switch v-model="newsForm.status" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="图片" prop="imgUrl">
              <ImgUpload v-model="newsForm.imgUrl" :limit="5"></ImgUpload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容" prop="content">
              <RichText v-model="newsForm.content"></RichText>
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
.news-edit{
  padding: 20px;
  & .el-form{
    width: 800px;
  }
}
</style>
