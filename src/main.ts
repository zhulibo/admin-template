import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import { router } from '@/router'

import '@/assets/css/base.pcss' // 基础样式
import '@/assets/css/common.pcss' // 公共样式
import '@/assets/css/element.pcss' // element自定义样式

// element
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

import directive from '@/directive' // 自定义指令

import pagination from '@/components/pagination/index.vue' // 分页组件
import icon from '@/components/svgIcon/index.vue' // svg图表组件

// 发布版本清除localStorage
// const localAppInfo = JSON.parse(localStorage.getItem('__APP_INFO__') ?? '')
// if (!import.meta.env.DEV && (!localAppInfo || localAppInfo.lastBuildTime !== __APP_INFO__.lastBuildTime)) {
//   localStorage.clear()
// }
// localStorage.setItem('__APP_INFO__', JSON.stringify(__APP_INFO__))

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .use(ElementPlus, { locale: zhCn })
  .use(directive)
  .component('page', pagination)
  .component('icon', icon)
  .mount('#app')

