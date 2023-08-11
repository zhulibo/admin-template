import {onMounted, onUnmounted} from "vue";
import * as echarts from "echarts";
type EChartsOption = echarts.EChartsOption;
import {debounce} from "js-fragment";

export function useEcharts() {

  let chart: any = null
  let chartDebounce: any = null

  // 初始化
  function initChart(id: string) {
    if(!chart) {
      chart = echarts.init(document.getElementById(id) as HTMLDivElement)
      window.addEventListener('resize', chartDebounce)
    }
  }

  // 设置option
  function setOption(chartOption: EChartsOption) {
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

