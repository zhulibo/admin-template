<script setup lang="ts">
import {onMounted} from "vue";
import {useEcharts} from "@/hooks/useEcharts";
import type {EChartsOption} from "echarts";

const {initChart, setOption} = useEcharts()

const chartPieOption: EChartsOption = {
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
}
onMounted(() => {
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
      chartPieOption.series![0].data.push({
        name: data[i].name,
        value: data[i].value,
      })
    }
    initChart('chart-pie')
    setOption(chartPieOption)
  }, 200)
})

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
