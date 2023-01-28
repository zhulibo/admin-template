<script setup lang="ts">
import {nextTick, reactive, ref} from "vue";
import {getExampleList, getExampleDetail, addExample, editExample, delExample} from "@/api/playground/example";
import type {ExampleParams, Example} from "@/api/playground/type";
import {ElMessage, ElMessageBox, ElTable} from "element-plus";
import {useRouter} from "vue-router";
import type {FormInstance, FormRules} from "element-plus";

const router = useRouter()

const schForm = reactive<ExampleParams>({
  title: '',
  startTime: '',
  endTime: '',
  status: undefined,
  page: 1,
  rows: 10
})

const loading = ref(true)
const exampleList = ref<Example[]>([])
const total = ref(0)
const tableRef = ref<InstanceType<typeof ElTable>>()

// 获取示例列表
const getExampleListHandle = () => {
  loading.value = true
  getExampleList(schForm)
    .then(res => {
      total.value = res.total
      exampleList.value = res.data
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}
getExampleListHandle()

const schFormRef = ref()

// 重置搜索条件
const resetForm = () => {
  schFormRef.value.resetFields()
  getListHandle()
}

// 刷新示例
const getListHandle = () => {
  tableRef.value?.clearSort() // 重置排序
  schForm.page = 1
  getExampleListHandle()
}

// 切换示例状态
const switchStatus = (row: Example) => {
  loading.value = true
  const data = {
    id: row.id,
    status: row.status,
  }
  editExample(data).then(res => {
    ElMessage.success(res.msg)
    getExampleListHandle()
  }).catch(() => {
    getExampleListHandle()
  })
}

// 删除示例
const delExampleHandle = (row: Example) => {
  ElMessageBox.confirm('确定删除 ' + row.title, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      delExample(row.id!)
        .then(res => {
          ElMessage.success(res.msg)
          getExampleListHandle()
        })
    })
    .catch(e => {
      console.log(e)
    })
}

const dialogEditVisible = ref(false)
const exampleFormRef = ref<FormInstance>()

// 新增示例
const addExampleHandle = async() => {
  dialogEditVisible.value = true
  await nextTick()
  resetExampleForm()
}

// 编辑示例
const editExampleHandle = async(row: Example) => {
  dialogEditVisible.value = true
  await nextTick()
  resetExampleForm()
  for (const key in exampleForm) {
    // @ts-ignore
    exampleForm[key] = row[key]
  }
  exampleForm.id = row.id
}

// 重置示例表单
const resetExampleForm = () => {
  exampleFormRef.value?.resetFields()
  delete exampleForm.id
}

const exampleForm = reactive<Example>({
  title: '',
  size: '',
  status: 1
})

const exampleRules = reactive<FormRules>({
  title: [{ required: true, message: '请输入', trigger: 'blur' }],
  size: [{ required: true, message: '请输入', trigger: 'blur' }],
  status: [{ required: true, message: '请输入', trigger: 'blur' }],
})

// 提交示例表单
const submitExampleForm = () => {
  exampleFormRef.value?.validate(valid => {
    if(valid) {
      if(exampleForm.id) {
        editExample(exampleForm)
          .then(res => {
            ElMessage.success(res.msg)
            dialogEditVisible.value = false
            getExampleListHandle()
          })
      }else{
        addExample(exampleForm)
          .then(res => {
            ElMessage.success(res.msg)
            dialogEditVisible.value = false
            getExampleListHandle()
          })
      }
    }
  })
}
</script>

<template>
  <div class="wrapper">
    <div class="table-head">
      <div class="sch">
        <el-form ref="schFormRef" :inline="true" :model="schForm">
          <el-form-item label="标题" prop="title">
            <el-input v-model="schForm.title" placeholder="请输入" style="width: 200px;" clearable @change="getListHandle" />
          </el-form-item>
          <el-form-item label="创建时间" prop="startTime">
            <el-date-picker v-model="schForm.startTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="起" style="width: 200px;" @change="getListHandle"></el-date-picker>
          </el-form-item>
          <el-form-item label="" prop="endTime">
            <el-date-picker v-model="schForm.endTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="至" style="width: 200px;" @change="getListHandle"></el-date-picker>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="schForm.status" @change="getListHandle">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button :label="0">禁用</el-radio-button>
              <el-radio-button :label="1">正常</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="getListHandle">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="new-item">
        <el-button type="primary" @click="addExampleHandle"><icon name="add" />新增</el-button>
      </div>
    </div>
    <el-table ref="tableRef" :data="exampleList" v-loading="loading">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" width="200" sortable></el-table-column>
      <el-table-column prop="title" label="标题" min-width="300">
        <template #default="scope">
          <span v-copy="scope.row.title">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="尺寸" width="200" sortable></el-table-column>
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
          <el-button type="primary" link @click="editExampleHandle(scope.row)"><icon name="edit" />修改</el-button>
          <el-button type="warning" link @click="delExampleHandle(scope.row)"><icon name="del" />删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Page v-model:currentPage="schForm.page" :total="total" @getList="getExampleListHandle"></Page>
    <el-dialog v-model="dialogEditVisible" title="编辑示例" width="800px">
      <el-form ref="exampleFormRef" :model="exampleForm" :rules="exampleRules" label-width="auto">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="名称" prop="title">
              <el-input v-model="exampleForm.title" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="尺寸" prop="size">
              <el-input v-model="exampleForm.size" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-switch v-model="exampleForm.status" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取消</el-button>
        <el-button type="primary" @click="submitExampleForm">确定</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="pcss" scoped>
</style>
