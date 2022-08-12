<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
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

const chartLineOption = reactive<EChartsOption>({
  title: {
    text: '持股比例',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: "{b}: {c} ({d}%)",
  },
  legend: {
    orient: 'vertical',
    left: 'right',
    top: 'middle'
  },
  series: [
    {
      type: 'pie',
      radius: '70%',
      center: ['35%', '50%'],
      data: [],
      label: {
        formatter: '{d}%'
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
const chartLine = ref()
const debounceLine = ref()

onMounted(() => {
  debounceLine.value = debounce(() => {
    if(chartLine.value){
      chartLine.value.resize()
    }
  }, 200)
  setTimeout(() => {
    const data = [
      {
        name: '名字1',
        value: 20
      },
      {
        name: '名字2',
        value: 30
      },
      {
        name: '名字3',
        value: 50
      },
    ]
    for (let i = 0; i < data.length; i++) {
      chartLineOption.series[0].data.push({
        name: data[i].name,
        value: data[i].value,
      })
    }
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
