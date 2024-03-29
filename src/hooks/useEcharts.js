import {onMounted, onUnmounted} from "vue";
import * as echarts from "echarts";
import {debounce} from "js-fragment";

export function useEcharts() {

  let chart = null
  let chartDebounce = null

  // 初始化
  function initChart(id) {
    if(!chart) {
      chart = echarts.init(document.getElementById(id))
      window.addEventListener('resize', chartDebounce)
    }
  }

  // 设置option
  function setOption(chartOption) {
    chart.setOption(chartOption)
  }

  // 获取实例
  function getInstance() {
    if(chart) {
      return chart
    }
  }

  // resize
  onMounted(() => {
    chartDebounce = debounce(() => {
      if(chart) {
        chart.resize()
      }
    }, 200)
  })

  // 销毁
  onUnmounted(() => {
    window.removeEventListener('resize', chartDebounce)
  })

  return {
    initChart,
    setOption,
    getInstance,
  }
}

