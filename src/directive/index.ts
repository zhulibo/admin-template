import type {App} from "vue";
import permission from './permission'
import drag from './drag'
import stopDrag from './stopDrag'
import copy from './copy'

export default function install(app: App) {
  app.directive('permission', permission)
  app.directive('drag', drag)
  app.directive('stopDrag', stopDrag)
  app.directive('copy', copy)
}
