
<template>
  <div>
    <apexchart
      width="500"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    {{data}}
  </div>
</template>

<script>
export default {
  props: [
    'data'
  ],
  computed: {
    series: function () {
      // `this` points to the vm instance
      return [{ name: 'series-1', data: this.data }]
    }
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: ['DNS', 'MQTT', 'HTTP', 'coap']
        }
      }
    }
  }
}
</script>
