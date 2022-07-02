<script setup>
import { ref, watch } from "vue";
import { useSettingStore } from '@/stores/setting'
import Editor from '@tinymce/tinymce-vue' // todo https://www.tiny.cloud/docs/tinymce/6/
import { fileUpload } from '@/api/common'

const settingStore = useSettingStore()
const props = defineProps({
  modelValue: {},
  height: {
    default: 400
  },
})
const emit = defineEmits([
  'update:modelValue'
])

const content = ref(props.modelValue)
// 向父组件输出值
watch(() => content, (content) => {
  emit('update:modelValue', content)
},{ immediate: true })
// 上传图片
const handleImgUpload = (blobInfo, success, failure) => {
  const data = new FormData()
  data.set('file', blobInfo.blob())
  fileUpload(data)
    .then((res) => {
      success(settingStore.getFileHost + res.data)
    })
    .catch(e => {
      failure('error')
    })
}
</script>

<template>
  <editor
    api-key="5s4j3k5n6oy09l6e7fsw2vzug5ruleqgdcoez1189b92ctvb"
    :init="{
    height: height,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
     ],
    toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help image',
    images_upload_handler: (blobInfo, success, failure) => {
      handleImgUpload(blobInfo, success, failure)
    }
  }"
    v-model="content"
  />
</template>
