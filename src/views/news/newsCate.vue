<script setup>
import {nextTick, reactive, ref, watch} from "vue"
import { getNewsCateList, addNewsCate, editNewsCate, delNewsCate } from '@/api/news/news'
import {ElMessage, ElMessageBox, ElTable} from 'element-plus'

const loading = ref(true)
const newsCateList = ref([])

// 获取新闻分类列表
const getNewsCateListHandle = () => {
  loading.value = true
  getNewsCateList()
    .then(res => {
      newsCateList.value = res.data
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}

getNewsCateListHandle()

const tableRef = ref()

// 刷新
const getListHandle = () => {
  getNewsCateListHandle()
}

// 切换状态
const switchStatus = (row) => {
  loading.value = true
  const data = {
    id: row.id,
    status: row.status,
  }
  editNewsCate(data).then(res => {
    ElMessage.success('操作成功')
    getNewsCateListHandle()
  }).catch(() => {
    getNewsCateListHandle()
  })
}

// 删除新闻分类
const delNewsCateHandle = (row) => {
  ElMessageBox.confirm('确定删除 ' + row.name, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      delNewsCate(row.id)
        .then(res => {
          ElMessage.success(res.msg)
          getNewsCateListHandle()
        })
    })
    .catch(e => {
      console.log(e)
    })
}

const dialogEditVisible = ref(false)
const newsCateFormRef = ref()

// 新增新闻分类
const addNewsCateHandle = async() => {
  dialogEditVisible.value = true
  await nextTick()
  resetNewsCateForm()
}

// 编辑新闻分类
const editNewsCateHandle = async(row) => {
  dialogEditVisible.value = true
  await nextTick()
  resetNewsCateForm()
  Object.assign(newsCateForm, row)

  // 合成el-cascader所绑定的id数组
  let temArr = []
  const parentId = Number(row.parentId)
  function schIds(list) {
    for (let i = 0; i < list.length; i++) {
      if(list[i].id === parentId){
        temArr = [parentId]
        return
      }else{
        temArr.push(list[i].id)
        if (list[i].children && list[i].children.length > 0) {
          schIds(list[i].children)
        }else{
          temArr = []
        }
      }
    }
  }
  schIds(newsCateList.value)
  parent.value = temArr
}

// 重置新闻分类表单
const resetNewsCateForm = () => {
  newsCateFormRef.value?.resetFields()
  parent.value = []
  delete newsCateForm.id
}

const parent = ref([])
const newsCateForm = reactive({
  parentId: '',
  name: '',
  orderNum: 0,
  status: 1,
})

const newsCateRules = reactive({
  title: [{ required: true, message: '请输入', trigger: 'blur' }],
  name: [{ required: true, message: '请输入', trigger: 'blur' }],
})

// 提交新闻分类表单
const submitNewsCateForm = () => {
  newsCateFormRef.value?.validate(valid => {
    if(valid) {
      if(newsCateForm.id) {
        editNewsCate(newsCateForm)
          .then(res => {
            ElMessage.success(res.msg)
            dialogEditVisible.value = false
            getNewsCateListHandle()
          })
      }else{
        addNewsCate(newsCateForm)
          .then(res => {
            ElMessage.success(res.msg)
            dialogEditVisible.value = false
            getNewsCateListHandle()
          })
      }
    }
  })
}

watch(() => parent, parent => {
  // 选择时是数组
  if(Array.isArray(parent.value)) {
    if (parent.value.length > 0) {
      newsCateForm.parentId = String(parent.value[parent.value.length - 1])
    } else {
      newsCateForm.parentId = ''
    }
  }
  // 清空时是null
  else if(parent.value === null) {
    newsCateForm.parentId = ''
  }
}, {deep: true})

</script>

<template>
  <div class="wrapper">
    <div class="table-head">
      <div class="new-item">
        <el-button type="primary" plain @click="getListHandle"><icon name="refresh" />刷新</el-button>
        <el-button type="primary" @click="addNewsCateHandle"><icon name="add" />新增</el-button>
      </div>
    </div>
    <el-table ref="tableRef" :data="newsCateList" v-loading="loading" row-key="id" default-expand-all>
      <el-table-column prop="createTime" label="时间" align="center" width="200"></el-table-column>
      <el-table-column prop="name" label="分类名称" min-width="400">
        <template #default="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column prop="orderNum" label="排序" align="center" min-width="120">
        <template #default="scope">{{scope.row.orderNum}}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" min-width="120">
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
      <el-table-column label="操作" align="center" width="150" fixed="right" class-name="manage-td">
        <template #default="scope">
          <el-button type="primary" link @click="editNewsCateHandle(scope.row)"><icon name="edit" />修改</el-button>
          <el-button type="warning" link @click="delNewsCateHandle(scope.row)"><icon name="del" />删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogEditVisible" title="编辑新闻分类" width="800px">
      <el-form ref="newsCateFormRef" :model="newsCateForm" :rules="newsCateRules" label-width="auto">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="上级分类" prop="parent">
              <el-cascader
                v-model="parent"
                :options="newsCateList"
                :props="{ value: 'id', label: 'name', children: 'children', checkStrictly: true, expandTrigger: 'hover' }"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分类名称" prop="name">
              <el-input v-model="newsCateForm.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="orderNum">
              <el-input v-model="newsCateForm.orderNum" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-switch v-model="newsCateForm.status" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取消</el-button>
        <el-button type="primary" @click="submitNewsCateForm">确定</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="pcss" scoped>
</style>
