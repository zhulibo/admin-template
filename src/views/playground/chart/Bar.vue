<script setup>
import {onMounted, reactive} from "vue";
import {useEcharts} from "@/hooks/useEcharts";

const {initChart, setOption} = useEcharts()

const chartBarOption = reactive({
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
  // color: ['#ccc'],
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
onMounted(() => {
  setTimeout(() => {
    chartBarOption.xAxis.data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    chartBarOption.series[0].data = [120, 200, 150, 80, 70, 110, 130]
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
