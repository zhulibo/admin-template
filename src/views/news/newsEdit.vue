<script setup lang="ts">
import {ref, reactive, watch} from "vue"
import { useRouter, useRoute } from "vue-router";
import ImgUpload from '@/components/fileUpload/ImgUpload.vue'
import RichText from '@/components/richText/RichText.vue'
import { goBack } from "@/hooks";
import {getNewsDetail, editNews, addNews, getNewsCateList} from "@/api/news/news";
import {ElMessage} from 'element-plus'
import type {FormInstance, FormRules} from 'element-plus'
import type {News, NewsCate} from "@/api/news/type";

const router = useRouter()
const route = useRoute()

const id = route.query.id as unknown as number
const title = route.meta.title

const cateList = ref<NewsCate[]>([])

// 获取新闻分类列表
const getNewsCateListHandle = () => {
  getNewsCateList()
    .then(res => {
      cateList.value = res.data
      if(id) {
        getNewsDetailHandle()
      }
    })
}
getNewsCateListHandle()

const cateArr = ref<number[] | null>([])

// 获取新闻详情
const getNewsDetailHandle = () => {
  getNewsDetail(id)
    .then(res => {
      // 返显（除cateId）
      for (const key in newsForm) {
        if(key !== 'cateId') {
          // @ts-ignore
          newsForm[key] = res.data[key]
        }
      }
      // 合成el-cascader所绑定的id数组
      const cateId = res.data.cateId
      const temArr: number[] = []
      let hasFind = false
      function findItem(list: NewsCate[]) {
        for (let i = 0; i < list.length; i++) {
          if(hasFind) {
            break
          }
          if(list[i].id === cateId){
            temArr.push(list[i].id!)
            hasFind = true
          }else{
            if (list[i].children && list[i].children!.length > 0) {
              // 添加list[i].id，开始查找children项
              temArr.push(list[i].id!)
              findItem(list[i].children!)
            }else{
              // children里不存在要找的目标，删除list[i].id
              if(i === list.length - 1){
                temArr.pop()
              }
            }
          }
        }
      }
      findItem(cateList.value)
      cateArr.value = temArr
      newsForm.cateId = temArr[temArr.length - 1] // 赋值cateArr不会触发cascaderChange
    })
}

const newsForm = reactive<News>({
  title: '',
  imgUrl: '',
  cateId: undefined,
  content: '',
  type: 0,
  status: 0,
})
const newsRules = reactive<FormRules>({
  title: [{ required: true, message: '请输入', trigger: 'blur' }],
  imgUrl: [{ required: true, message: '请输入', trigger: 'blur' }],
  cateId: [{ required: true, message: '请选择', trigger: 'blur' }],
  content: [{ required: true, message: '请输入', trigger: 'blur' }],
})

const newsFormRef = ref<FormInstance>()

// 新闻分类变更
const cascaderChange = () => {
  // 选择时是数组
  if(Array.isArray(cateArr.value)) {
    if (cateArr.value.length > 0) {
      newsForm.cateId = cateArr.value[cateArr.value.length - 1]
    } else {
      newsForm.cateId = undefined
    }
  }
  // 清空时是null
  else if(cateArr.value === null) {
    newsForm.cateId = undefined
  }
}

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
      <el-page-header title="返回" :content="title" @back="goBack" />
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
          <el-col :span="12">
            <el-form-item label="分类" prop="cateId">
              <el-cascader
                v-model="cateArr"
                :options="cateList"
                :props="{ value: 'id', label: 'name', children: 'children', checkStrictly: true, expandTrigger: 'hover' }"
                @change="cascaderChange"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
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
