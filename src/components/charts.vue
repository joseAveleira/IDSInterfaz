
<template>
  <div id="chart">
    <apexchart
      type="pie"
      width="380"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  props: [
    'series'
  ],
  data: function () {
    return {
      chartOptions: {
        chart: {
          width: 380,
          type: 'pie'
        },
        labels: ['DNS', 'MQTT', 'HTTP', 'CoAP'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    }
  }
}
</script>
