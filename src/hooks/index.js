import { router } from '@/router'

// 返回上一页
export function goBack() {
  router.go(-1)
}

// +1
export function increment(current, max = 10) {
  if (current < max) {
    return current + 1
  }
  return current
}
