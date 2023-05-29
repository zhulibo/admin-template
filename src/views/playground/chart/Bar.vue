<script setup lang="ts">
import {onMounted} from "vue";
import {useEcharts} from "@/hooks/useEcharts";
import type {EChartsOption} from "echarts";

const {initChart, setOption} = useEcharts()

const chartBarOption: EChartsOption = {
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
}
onMounted(() => {
  setTimeout(() => {
    chartBarOption.xAxis.data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    chartBarOption.series![0].data = [120, 200, 150, 80, 70, 110, 130]
    initChart('chart-bar')
    setOption(chartBarOption)
  }, 200)
})

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
