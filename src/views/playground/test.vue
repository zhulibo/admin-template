<script setup lang="ts">
import {nextTick, reactive, ref} from "vue";
import {getTestList, getTestDetail, addTest, editTest, delTest} from "@/api/playground/playground";
import type {TestParams, Test} from "@/api/playground/type";
import {ElMessage, ElMessageBox, ElTable} from "element-plus";
import {useRouter} from "vue-router";
import {FormInstance, FormRules} from "element-plus/es";

const router = useRouter()

const schForm = reactive<TestParams>({
  title: '',
  startTime: '',
  endTime: '',
  status: undefined,
  page: 1,
  rows: 10
})

const loading = ref(true)
const testList = ref<Test[]>([])
const total = ref(0)
const tableRef = ref<InstanceType<typeof ElTable>>()

// 获取测试列表
const getTestListHandle = () => {
  loading.value = true
  getTestList(schForm)
    .then(res => {
      total.value = res.total
      testList.value = res.data
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}
getTestListHandle()

const schFormRef = ref()

// 重置搜索条件
const resetForm = () => {
  schFormRef.value.resetFields()
  getListHandle()
}

// 刷新测试
const getListHandle = () => {
  tableRef.value?.clearSort() // 重置排序
  schForm.page = 1
  getTestListHandle()
}

// 切换测试状态
const switchStatus = (row: Test) => {
  loading.value = true
  const data = {
    id: row.id,
    status: row.status,
  }
  editTest(data).then(res => {
    ElMessage.success(res.msg)
    getTestListHandle()
  }).catch(() => {
    getTestListHandle()
  })
}

// 删除测试
const delTestHandle = (row: Test) => {
  ElMessageBox.confirm('确定删除 ' + row.title, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      delTest(row.id!)
        .then(res => {
          ElMessage.success(res.msg)
          getTestListHandle()
        })
    })
    .catch(e => {
      console.log(e)
    })
}

const dialogEditVisible = ref(false)
const testFormRef = ref<FormInstance>()

// 新增测试
const addTestHandle = async() => {
  dialogEditVisible.value = true
  await nextTick()
  resetTestForm()
}

// 编辑测试
const editTestHandle = async(row: Test) => {
  dialogEditVisible.value = true
  await nextTick()
  resetTestForm()
  for (const key in testForm) {
    // @ts-ignore
    testForm[key] = row[key]
  }
  testForm.id = row.id
}

// 重置测试表单
const resetTestForm = () => {
  testFormRef.value?.resetFields()
  delete testForm.id
}

const testForm = reactive<Test>({
  title: '',
  size: '',
  status: 1
})

const testRules = reactive<FormRules>({
  title: [{ required: true, message: '请输入', trigger: 'blur' }],
  size: [{ required: true, message: '请输入', trigger: 'blur' }],
  status: [{ required: true, message: '请输入', trigger: 'blur' }],
})

// 提交测试表单
const submitTestForm = () => {
  testFormRef.value?.validate(valid => {
    if(valid) {
      if(testForm.id) {
        editTest(testForm)
          .then(res => {
            ElMessage.success(res.msg)
            dialogEditVisible.value = false
            getTestListHandle()
          })
      }else{
        addTest(testForm)
          .then(res => {
            ElMessage.success(res.msg)
            dialogEditVisible.value = false
            getTestListHandle()
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
            <el-input v-model="schForm.title" placeholder="请输入" clearable @change="getListHandle" />
          </el-form-item>
          <el-form-item label="创建时间" prop="startTime">
            <el-date-picker v-model="schForm.startTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="起" style="width: 180px;" @change="getListHandle"></el-date-picker>
          </el-form-item>
          <el-form-item label="" prop="endTime">
            <el-date-picker v-model="schForm.endTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="至" style="width: 180px;" @change="getListHandle"></el-date-picker>
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
        <el-button type="primary" @click="addTestHandle"><icon name="add" />新增</el-button>
      </div>
    </div>
    <el-table ref="tableRef" :data="testList" v-loading="loading">
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
          <el-button type="primary" link @click="editTestHandle(scope.row)"><icon name="edit" />修改</el-button>
          <el-button type="warning" link @click="delTestHandle(scope.row)"><icon name="del" />删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Page v-model:currentPage="schForm.page" :total="total" @getList="getTestListHandle"></Page>
    <el-dialog v-model="dialogEditVisible" title="编辑测试" width="800px">
      <el-form ref="testFormRef" :model="testForm" :rules="testRules" label-width="auto">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="名称" prop="title">
              <el-input v-model="testForm.title" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="尺寸" prop="size">
              <el-input v-model="testForm.size" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-switch v-model="testForm.status" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取消</el-button>
        <el-button type="primary" @click="submitTestForm">确定</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="pcss" scoped>
</style>
