<script setup>
import { ref, watch } from "vue";
import { useUserStore } from '@/stores/user'
import { useSettingStore } from '@/stores/setting'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const settingStore = useSettingStore()
const props = defineProps({
  modelValue: {},
  accept: {
    default: '.jpg,.jpeg,.png,.gif'
  },
  limit: {
    default: 5
  },
})
const emit = defineEmits([
  'update:modelValue'
])

const headers = { // 请求头
  token: userStore.getUserInfo.token
}
const fileList = ref([]) // 返显数组
// 监听父组件v-model的值，返显
watch(() => props.modelValue, (imgUrls) => {
  const arr = []
  if(imgUrls){
    imgUrls.split(',').forEach((item) => {
      if(item) arr.push({ url: settingStore.getFileHost + item })  // 补全根路径
    })
  }
  fileList.value = arr
},{ immediate: true })
// 上传前校验
const handleImgBeforeUpload = (file) => {
  if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/gif') {
    if (file.size / 1024 / 1024 >= 10) {
      ElMessage.warning('图片最大10M')
      return false
    }
  }
}
// 上传成功
const handleImgSuccess = (res, file, fileList) => {
  console.log('handleImgSuccess', res, file, fileList)
  emitImgUrls(fileList)
}
// 上传出错
const handleImgError = (err, file, fileList) => {
  console.log('handleImgError', err, file, fileList)
  ElMessage.error('逻辑处理错误')
}
// 删除图片
const handleImgRemove = (file, fileList) => {
  console.log('handleImgRemove', file, fileList)
  emitImgUrls(fileList)
}
// 图片超出限制
const handleImgExceed = (file, fileList) => {
  console.log('handleImgExceed', file, fileList)
  ElMessage.warning(`最多${props.limit}张图片←_←`)
}
// 输出图片url
const emitImgUrls = (fileList) => {
  // console.log(JSON.stringify(fileList))
  // 一次选中多张图片时判断所有图片都已上传成功
  for (let i = 0; i < fileList.length; i++) {
    if(fileList[i].status !== 'success'){
      return
    }
  }
  const fileHost = settingStore.getFileHost
  const imgUrls = [] // 暂存图片数组
  for (let i = 0; i < fileList.length; i++) {
    if (fileList[i].response) { // 新上传的图片
      imgUrls.push(fileList[i].response.data)
    } else {
      let imgUrl = fileList[i].url
      if(imgUrl.indexOf(fileHost) !== -1){
        imgUrl = imgUrl.replace(fileHost, '') // 去掉根路径
      }
      imgUrls.push(imgUrl)
    }
  }
  emit('update:modelValue', imgUrls.toString())
}

// 预览图片
const dialogVisible = ref(false) // 预览图片弹窗
const dialogImageUrl = ref('') // 预览图片url
const handleImgPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}
</script>

<template>
  <div class="file-upload">
    <el-upload
      :class="{ hide: fileList.length >= limit }"
      action="/api/common/uploadFile"
      :headers="headers"
      list-type="picture-card"
      :accept="accept"
      :multiple="true"
      :limit="limit"
      :file-list="fileList"
      :before-upload="handleImgBeforeUpload"
      :on-preview="handleImgPreview"
      :on-success="handleImgSuccess"
      :on-error="handleImgError"
      :on-remove="handleImgRemove"
      :on-exceed="handleImgExceed"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <img :src="dialogImageUrl" alt="" style="width: 100%;">
    </el-dialog>
  </div>
</template>

<style scoped>
.file-upload{
  & :deep(.hide .el-upload--picture-card) {
    display: none;
  }
  & :deep(.el-upload-list__item){
    transition: none !important;
  }
  & :deep(.el-upload-list--picture-card .el-upload-list__item){
    vertical-align: bottom;
  }
}
</style>
