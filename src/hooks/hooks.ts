import { router } from '@/router'

// 返回上一页
export function goBack() {
  router.go(-1)
}

