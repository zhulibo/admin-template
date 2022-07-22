import {useUserStore} from '@/stores/user'
import { ElMessage } from 'element-plus'

let userStore

export default function install(app) {
  app.directive('permission', { // 权限
    mounted(el, binding) {

      if(!userStore) userStore = useUserStore()

      const { value } = binding // 按钮所需的权限
      const permissions = userStore.getUserInfo.permissions // 用户拥有的权限
      if (value && value instanceof Array && value.length > 0) {
        const hasPermission = value.every((val) => permissions.includes(val))
        if (!hasPermission) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      } else {
        throw new Error(`需要权限值，如：v-permission="['aaa:bbb:ccc','xxx:yyy']"`)
      }
    }
  })
  app.directive('drag', { // 拖动
    mounted(el) {
      el.onmousedown = (e) => {
        // 点击处和div左上角的位差
        const disX = e.clientX - el.offsetLeft
        const disY = e.clientY - el.offsetTop
        document.onmousemove = (e) => {
          // 鼠标移动时计算出div左上角的坐标值
          let left = e.clientX - disX
          let top = e.clientY - disY
          // 防止拖出可视区域
          if (left < 0) {
            left = 0
          } else if (left > document.documentElement.clientWidth - 100) {
            left = document.documentElement.clientWidth - 100
          }
          if (top < 0) {
            top = 0
          } else if (top > document.documentElement.clientHeight - 40) {
            top = document.documentElement.clientHeight - 40
          }
          el.style.right = 'auto'
          el.style.bottom = 'auto'
          el.style.left = left + 'px'
          el.style.top = top + 'px'
          window.getSelection
            ? window.getSelection().removeAllRanges()
            : document.selection.empty()
        }
        document.onmouseup = () => {
          document.onmousemove = null // 鼠标弹起来的时候不再移动
          document.onmouseup = null // 退出onmouseup时间循环
        }
      }
    },
  })
  app.directive('stopDrag', { // 禁止拖动
    mounted(el) {
      el.onmousedown = function(e) {
        e.stopPropagation()
      }
    },
  })
  app.directive('copy', { // 点击复制
    mounted(el, binding) {
      el.onmousedown = () => {
        const { value } = binding
        navigator.clipboard.writeText(value)
          .then(() => {
            ElMessage.success('复制成功')
          })
      }
    },
  })
}
