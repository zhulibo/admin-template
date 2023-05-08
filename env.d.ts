/// <reference types="vite/client" />

declare const __APP_INFO__: {
  lastBuildTime: string
}

import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}
