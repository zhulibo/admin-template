import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import { router } from '@/router'

// element
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import directive from '@/directive' // 自定义指令

import Pagination from '@/components/pagination/Pagination.vue' // 分页组件
import Icon from '@/components/svgIcon/SvgIcon.vue' // svg图标组件

// 发布版本清除localStorage
if (!import.meta.env.DEV) {
  const localAppInfo = JSON.parse(localStorage.getItem('APP_INFO') || '{}')
  if (localAppInfo.lastBuildTime !== __APP_INFO__.lastBuildTime) {
    localStorage.clear()
    localStorage.setItem('APP_INFO', JSON.stringify(__APP_INFO__))
  }
}

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .use(ElementPlus, { locale: zhCn })
  .use(directive)
  .component('Page', Pagination)
  .component('Icon', Icon)
  .mount('#app')

