<script setup lang="ts">
import {onMounted} from "vue";
import {useEcharts} from "@/hooks/useEcharts";

const {initChart, setOption} = useEcharts()

const chartLineOption = {
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
      type: 'line',
      label: {
        show: true
      }
    }
  ]
}
onMounted(() => {
  setTimeout(() => {
    chartLineOption.xAxis.data = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    chartLineOption.series[0].data = [120, 200, 150, 80, 70, 110, 130]
    initChart('chart-line')
    setOption(chartLineOption)
  }, 200)
})

</script>

<template>
  <div id="chart-line"></div>
</template>

<style scoped lang="pcss">
#chart-line{
  width: 100%;
  height: 400px;
}
</style>
