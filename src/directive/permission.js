import {useUserStore} from "@/stores/user";

// 权限
export default {
  mounted(el, binding) {
    const userStore = useUserStore()
    const { value } = binding // 按钮所需的权限
    const permissions = userStore.getUserInfo.permissions // 用户拥有的权限
    if (value && value instanceof Array && value.length > 0) {
      const hasPermission = value.every((val) => permissions.includes(val))
      if (!hasPermission) {
        el.parentNode?.removeChild(el)
      }
    } else {
      throw new Error(`需要权限值，如：v-permission="['aaa:bbb:ccc','xxx:yyy']"`)
    }
  }
}
