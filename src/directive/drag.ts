// 拖动
export default {
  mounted(el: HTMLElement) {
    el.onmousedown = (e: MouseEvent) => {
      // 点击处和div左上角的位差
      const disX = e.clientX - el.offsetLeft
      const disY = e.clientY - el.offsetTop
      document.onmousemove = (e) => {
        // 鼠标移动时计算出div左上角的坐标值
        let left = e.clientX - disX
        let top = e.clientY - disY
        // 防止拖出可视区域
        if (left < 0) {
          left = 0
        } else if (left > document.documentElement.clientWidth - 100) {
          left = document.documentElement.clientWidth - 100
        }
        if (top < 0) {
          top = 0
        } else if (top > document.documentElement.clientHeight - 40) {
          top = document.documentElement.clientHeight - 40
        }
        el.style.right = 'auto'
        el.style.bottom = 'auto'
        el.style.left = left + 'px'
        el.style.top = top + 'px'
        // 防止选中文字
        window.getSelection
          ? (window.getSelection() as any).removeAllRanges()
          : (document as any).selection.empty()
      }
      document.onmouseup = () => {
        document.onmousemove = null // 鼠标弹起来的时候不再移动
        document.onmouseup = null // 退出onmouseup时间循环
      }
    }
  },
}
