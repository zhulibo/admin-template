<script setup lang="ts">
import {onMounted} from "vue";
import {useEcharts} from "@/hooks/useEcharts";

const {initChart, setOption} = useEcharts()

const chartPieOption = {
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
  // color: ['#ccc', '#ddd', '#eee'],
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
}
onMounted(() => {
  setTimeout(() => {
    chartPieOption.series[0].data = [
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
    initChart('chart-pie')
    setOption(chartPieOption)
  }, 200)
})

</script>

<template>
  <div id="chart-pie"></div>
</template>

<style scoped lang="pcss">
#chart-pie{
  width: 100%;
  height: 400px;
}
</style>
