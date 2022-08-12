<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import * as echarts from 'echarts/core';
import { debounce } from 'js-fragment'

import {TitleComponent, TooltipComponent, GridComponent} from 'echarts/components';
import type { TitleComponentOption, TooltipComponentOption, GridComponentOption} from 'echarts/components';
import {BarChart} from 'echarts/charts';
import type {BarSeriesOption} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';

echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer])
type EChartsOption = echarts.ComposeOption<TitleComponentOption | TooltipComponentOption | GridComponentOption | BarSeriesOption>

const chartLineOption = reactive<EChartsOption>({
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
    left: '3%',
    right: '4%',
    bottom: '3%',
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
      type: 'bar'
    }
  ]
})
const chartLine = ref()
const debounceLine = ref()

onMounted(() => {
  debounceLine.value = debounce(() => {
    if(chartLine.value){
      chartLine.value.resize()
    }
  }, 200)
  setTimeout(() => {
    chartLineOption.xAxis.data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    chartLineOption.series[0].data = [120, 200, 150, 80, 70, 110, 130]
    initChartLine()
  }, 500)
})

// 初始化图表
const initChartLine = () => {
  if (!chartLine.value) {
    chartLine.value = echarts.init(document.getElementById('chart-line')!)
    window.addEventListener('resize', debounceLine.value)
  }
  chartLine.value.setOption(chartLineOption)
}
</script>

<template>
  <div class="wrapper">dashboard</div>
  <div id="chart-line"></div>
</template>

<style scoped>
#chart-line{
  margin-top: 10px;
  width: 1000px;
  height: 400px;
}
</style>
