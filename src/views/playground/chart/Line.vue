<script setup lang="ts">
import {onMounted, reactive} from "vue";
import * as echarts from 'echarts/core';
import { debounce } from 'js-fragment'

import {TitleComponent, TooltipComponent, GridComponent} from 'echarts/components';
import type {TitleComponentOption, TooltipComponentOption, GridComponentOption} from 'echarts/components';
import {LineChart} from 'echarts/charts';
import type {LineSeriesOption} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';

echarts.use([TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer])
type EChartsOption = echarts.ComposeOption<TitleComponentOption | TooltipComponentOption | GridComponentOption | LineSeriesOption>

const chartLineOption = reactive<EChartsOption>({
  title: {
    text: '折线图',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: 20,
    right: 20,
    bottom: 20,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'line',
      label: {
        show: true
      }
    }
  ]
})
let chartLine: any = null
let debounceLine: any = null

onMounted(() => {
  debounceLine = debounce(() => {
    if(chartLine){
      chartLine.resize()
    }
  }, 200)
  setTimeout(() => {
    (chartLineOption as any).xAxis.data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    (chartLineOption as any).series[0].data = [120, 200, 150, 80, 70, 110, 130]
    initChartLine()
  }, 200)
})

// 初始化图表
const initChartLine = () => {
  if (!chartLine) {
    chartLine = echarts.init(document.getElementById('chart-line')!)
    window.addEventListener('resize', debounceLine)
  }
  chartLine.setOption(chartLineOption)
}
</script>

<template>
  <div id="chart-line"></div>
</template>

<style lang="pcss" scoped>
#chart-line{
  width: 100%;
  height: 400px;
}
</style>
