// 禁止拖动
export default {
  mounted(el: HTMLElement) {
    el.onmousedown = function(e: MouseEvent) {
      e.stopPropagation()
    }
  },
}
