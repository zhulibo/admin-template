<script setup lang="ts">
import {onMounted, reactive} from "vue";
import * as echarts from 'echarts/core';
import { debounce } from 'js-fragment'

import {TitleComponent, TooltipComponent, GridComponent} from 'echarts/components';
import type {TitleComponentOption, TooltipComponentOption, GridComponentOption} from 'echarts/components';
import {BarChart} from 'echarts/charts';
import type {BarSeriesOption} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';

echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer])
type EChartsOption = echarts.ComposeOption<TitleComponentOption | TooltipComponentOption | GridComponentOption | BarSeriesOption>

const chartBarOption = reactive<EChartsOption>({
  title: {
    text: '柱状图',
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
      type: 'bar',
      barWidth: '30%',
      label: {
        show: true
      }
    }
  ]
})
let chartBar: any = null
let debounceLine: any = null

onMounted(() => {
  debounceLine = debounce(() => {
    if(chartBar){
      chartBar.resize()
    }
  }, 200)
  setTimeout(() => {
    (chartBarOption as any).xAxis.data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    (chartBarOption as any).series[0].data = [120, 200, 150, 80, 70, 110, 130]
    initChartLine()
  }, 200)
})

// 初始化图表
const initChartLine = () => {
  if (!chartBar) {
    chartBar = echarts.init(document.getElementById('chart-bar')!)
    window.addEventListener('resize', debounceLine)
  }
  chartBar.setOption(chartBarOption)
}
</script>

<template>
  <div id="chart-bar"></div>
</template>

<style lang="pcss" scoped>
#chart-bar{
  width: 100%;
  height: 400px;
}
</style>
