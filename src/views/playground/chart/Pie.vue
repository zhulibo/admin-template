<script setup lang="ts">
import {onMounted, reactive} from "vue";
import * as echarts from 'echarts/core';
import { debounce } from 'js-fragment'

import {TitleComponent, TooltipComponent, LegendComponent} from 'echarts/components';
import type { TitleComponentOption, TooltipComponentOption, LegendComponentOption} from 'echarts/components';
import {PieChart} from 'echarts/charts';
import type {PieSeriesOption} from 'echarts/charts';
import {LabelLayout} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';

echarts.use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout])
type EChartsOption = echarts.ComposeOption<TitleComponentOption | TooltipComponentOption | LegendComponentOption | PieSeriesOption>

const chartPieOption = reactive<EChartsOption>({
  title: {
    text: '饼图',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: "{b}: {c} {d}%",
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    top: 'middle'
  },
  series: [
    {
      type: 'pie',
      center: ['60%', '55%'],
      data: [],
      label: {
        formatter: '{b}: {c} {d}%'
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})
let chartPie: any = null
let debounceLine: any = null

onMounted(() => {
  debounceLine = debounce(() => {
    if(chartPie){
      chartPie.resize()
    }
  }, 200)
  setTimeout(() => {
    const data = [
      {
        name: 'item1',
        value: 10
      },
      {
        name: 'item2',
        value: 20
      },
      {
        name: 'item3',
        value: 35
      },
    ]
    for (let i = 0; i < data.length; i++) {
      (chartPieOption as any).series[0].data.push({
        name: data[i].name,
        value: data[i].value,
      })
    }
    initChartLine()
  }, 200)
})

// 初始化图表
const initChartLine = () => {
  if (!chartPie) {
    chartPie = echarts.init(document.getElementById('chart-pie')!)
    window.addEventListener('resize', debounceLine)
  }
  chartPie.setOption(chartPieOption)
}
</script>

<template>
  <div id="chart-pie"></div>
</template>

<style lang="pcss" scoped>
#chart-pie{
  width: 100%;
  height: 400px;
}
</style>
