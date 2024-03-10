// 禁止拖动
export default {
  mounted(el) {
    el.onmousedown = function(e) {
      e.stopPropagation()
    }
  },
}
