<script setup lang="ts">
import {reactive, ref, watch} from "vue"
import { useRouter } from 'vue-router'
import {getNewsList, editNews, delNews, getNewsCateList} from '@/api/news/news'
import {ElMessage, ElMessageBox, ElTable} from 'element-plus'
import {useSettingStore} from "@/stores/setting";
import type {News, NewsListParams, NewsCate} from "@/api/news/type";

const settingStore = useSettingStore()
const router = useRouter()

const cateList = ref<NewsCate[]>([])

// 获取新闻分类列表
const getNewsCateListHandle = () => {
  getNewsCateList()
    .then(res => {
      cateList.value = res.data
    })
}
getNewsCateListHandle()

const schForm = reactive<NewsListParams>({
  cateId: undefined,
  title: '',
  startTime: '',
  endTime: '',
  status: undefined,
  page: 1,
  rows: 10,
})

// 新闻分类变更
const cascaderChange = (cateArr: number[] | null) => {
  // 选择时是数组
  if(Array.isArray(cateArr)) {
    if (cateArr.length > 0) {
      schForm.cateId = cateArr[cateArr.length - 1]
    } else {
      schForm.cateId = undefined
    }
  }
  // 清空时是null
  else if(cateArr === null) {
    schForm.cateId = undefined
  }
  getListHandle()
}


const loading = ref(true)
const newsList = ref<News[]>([])
const total = ref(0)
const tableRef = ref<InstanceType<typeof ElTable>>()

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

// 返显新闻分类
const unEscapeCate = (cateId: number) => {
  const temArr: string[] = []
  let hasFind = false
  function findItem(list: NewsCate[]) {
    for (let i = 0; i < list.length; i++) {
      if(hasFind) {
        break
      }
      if(list[i].id === cateId){
        temArr.push(list[i].name)
        hasFind = true
      }else{
        if (list[i].children && list[i].children!.length > 0) {
          // 添加list[i].name，开始查找children项
          temArr.push(list[i].name)
          findItem(list[i].children!)
        }else{
          // children里不存在要找的目标，删除list[i].name
          if(i === list.length - 1){
            temArr.pop()
          }
        }
      }
    }
  }
  findItem(cateList.value)
  return temArr.join(' / ')
}

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
const addNewsHandle = () => {
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
    ElMessage.success(res.msg)
    getNewsListHandle()
  }).catch(() => {
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
      delNews(row.id!)
        .then(res => {
          ElMessage.success(res.msg)
          getNewsListHandle()
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
          <el-form-item label="分类" prop="">
            <el-cascader
              :options="cateList"
              :props="{ value: 'id', label: 'name', children: 'children', checkStrictly: true, expandTrigger: 'hover' }"
              @change="cascaderChange"
              clearable
            />
          </el-form-item>
          <el-form-item label="发布时间" prop="startTime">
            <el-date-picker v-model="schForm.startTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="起" style="width: 180px;" @change="getListHandle"></el-date-picker>
          </el-form-item>
          <el-form-item label="" prop="endTime">
            <el-date-picker v-model="schForm.endTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="至" style="width: 180px;" @change="getListHandle"></el-date-picker>
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
        <el-button type="primary" @click="addNewsHandle"><icon name="add" />新增</el-button>
      </div>
    </div>
    <el-table ref="tableRef" :data="newsList" v-loading="loading">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="createTime" label="发布时间" align="center" width="200" sortable></el-table-column>
      <el-table-column prop="title" label="标题" min-width="300">
        <template #default="scope">
          <span v-copy="scope.row.title">{{scope.row.title}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column prop="imgUrl" label="图片" align="center" min-width="140">-->
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
      <el-table-column prop="cateId" label="分类" min-width="140" sortable>
        <template #default="scope">
          <span>{{unEscapeCate(scope.row.cateId)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" min-width="120" sortable>
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="switchStatus(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200" fixed="right" class-name="manage-td">
        <template #default="scope">
          <el-button type="primary" link @click="editNewsHandle(scope.row)" v-permission="['news:edit']"><icon name="edit" />修改</el-button>
          <el-button type="warning" link @click="delNewsHandle(scope.row)" v-permission="['news:del']"><icon name="del" />删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Page v-model:currentPage="schForm.page" :total="total" @getList="getNewsListHandle"></Page>
  </div>
</template>

<style lang="pcss" scoped>
</style>
