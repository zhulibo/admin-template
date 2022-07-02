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
// import svgIcon from '@/components/svgIcon' // svgIcon组件

const app = createApp(App)
app
  .use(createPinia())
  .use(router)
  .use(ElementPlus, { locale: zhCn })
  .use(directive)
  .component('page', pagination)
  // .component('icon', svgIcon)
  .mount('#app')
