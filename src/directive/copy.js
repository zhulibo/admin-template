import {ElMessage} from "element-plus";

// 点击复制
export default {
  mounted(el, binding) {
    el.onmousedown = () => {
      const { value } = binding
      navigator.clipboard.writeText(value)
        .then(() => {
          ElMessage.success('复制成功')
        })
    }
  },
}
