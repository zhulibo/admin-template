import {ElMessage} from "element-plus";
import type {DirectiveBinding} from "vue";

// 点击复制
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.onmousedown = () => {
      const { value } = binding
      navigator.clipboard.writeText(value)
        .then(() => {
          ElMessage.success('复制成功')
        })
    }
  },
}
