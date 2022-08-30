<script setup lang="ts">
import { reactive, ref} from "vue"
import { useRouter } from 'vue-router'
import { getNewsList, editNews, delNews } from '@/api/news/news'
import {ElMessage, ElMessageBox, ElTable} from 'element-plus'
import {useSettingStore} from "@/stores/setting";
import type {News} from "@/api/news/type";

const settingStore = useSettingStore()
const router = useRouter()

const schForm = reactive({
  title: '',
  startTime: '',
  endTime: '',
  status: '',
  page: 1,
  rows: 10,
})
const loading = ref(true)
const newsList = ref<News[]>([])
const total = ref(0)
// 获取新闻列表
const getNewsListHandle = () => {
  loading.value = true
  getNewsList(schForm)
    .then(res => {
      newsList.value = res.data
      total.value = res.total
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}

getNewsListHandle()

const tableRef = ref<InstanceType<typeof ElTable>>()

// 刷新
const getListHandle = () => {
  tableRef.value?.clearSort() // 重置排序
  schForm.page = 1
  getNewsListHandle()
}

const schFormRef = ref()

// 重置搜索条件
const resetForm = () => {
  schFormRef.value.resetFields()
  getListHandle()
}

// 新增新闻
const addNews = () => {
  router.push({path: 'newsEdit'})
}

// 编辑新闻
const editNewsHandle = (row: News) => {
  router.push({path: 'newsEdit', query: {id: row.id}})
}

// 切换状态
const switchStatus = (row: News) => {
  loading.value = true
  const data = {
    id: row.id,
    status: row.status,
  }
  editNews(data).then(res => {
    ElMessage.success('操作成功')
    getNewsListHandle()
  }).catch(e => {
    getNewsListHandle()
  })
}

// 删除新闻
const delNewsHandle = (row: News) => {
  ElMessageBox.confirm('确定删除 ' + row.title, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      loading.value = true
      delNews(row.id!)
        .then(() => {
          getNewsListHandle()
          ElMessage.success('删除成功')
        })
        .catch(() => {
          loading.value = false
        })
    })
}
</script>

<template>
  <div class="wrapper">
    <div class="table-head">
      <div class="sch">
        <el-form ref="schFormRef" :inline="true" :model="schForm">
          <el-form-item label="标题" prop="title">
            <el-input v-model="schForm.title" placeholder="请输入" clearable @change="getListHandle" />
          </el-form-item>
          <el-form-item label="日期" prop="startTime">
            <el-date-picker v-model="schForm.startTime" type="date" value-format="YYYY-MM-DD" placeholder="起" style="width: 130px;" @change="getListHandle"></el-date-picker>
          </el-form-item>
          <el-form-item label="" prop="endTime">
            <el-date-picker v-model="schForm.endTime" type="date" value-format="YYYY-MM-DD" placeholder="至" style="width: 130px;" @change="getListHandle"></el-date-picker>
          </el-form-item>
          <el-form-item label="发布状态" prop="status">
            <el-radio-group v-model="schForm.status" @change="getListHandle">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button :label="0">未发布</el-radio-button>
              <el-radio-button :label="1">发布</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="getListHandle">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="new-item">
        <el-button type="primary" @click="addNews"><i class="el-icon-plus"></i>新增</el-button>
      </div>
    </div>
    <el-table ref="tableRef" :data="newsList" v-loading="loading">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="createTime" label="时间" sortable min-width="200"></el-table-column>
      <el-table-column prop="title" label="标题" min-width="300">
        <template #default="scope">
          <span v-copy="scope.row.title">{{scope.row.title}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column prop="imgUrl" label="图片" align="center" min-width="120">-->
<!--        <template #default="scope">-->
<!--          <el-image-->
<!--            :src="settingStore.getFileHost + scope.row.imgUrl"-->
<!--            :preview-src-list="[settingStore.getFileHost + scope.row.imgUrl]"-->
<!--            fit="contain"-->
<!--            :hide-on-click-modal="true"-->
<!--            style="height: 32px;"-->
<!--          >-->
<!--          </el-image>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column prop="type" label="分类" min-width="120"></el-table-column>
      <el-table-column prop="" label="地区" align="center" sortable :sort-by="['province', 'city', 'area']" min-width="200">
        <template #default="scope">
          <span v-if="scope.row.province">{{scope.row.province + ' ' + scope.row.city + ' ' + scope.row.area}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" min-width="120">
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            @change="switchStatus(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="200" fixed="right">
        <template #default="scope">
          <el-button type="primary" link icon="el-icon-edit" @click="editNewsHandle(scope.row)" v-permission="['news:edit']">修改</el-button>
          <el-button type="warning" link icon="el-icon-delete" @click="delNewsHandle(scope.row)" v-permission="['news:del']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page v-model:currentPage="schForm.page" :total="total" @getList="getNewsListHandle"></page>
  </div>
</template>

<style lang="pcss" scoped>
</style>
