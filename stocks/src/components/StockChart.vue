<template>
  <div>
    <highcharts :constructor-type="'stockChart'" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
import stockInit from 'highcharts/modules/stock'

exportingInit(Highcharts)
stockInit(Highcharts)

export default {
  name: 'stock-chart',
  props: {
    series: Array,
    title: String
  },
  components: {
    highcharts: Chart
  },
  computed: {
    chartOptions () {
      let config = {
        colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
          '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
        chart: {
          backgroundColor: '#002E55'
        },
        xAxis: {
          gridLineWidth: 0,
          minorGridLineWidth: 0
        },
        yAxis: {
          gridLineWidth: 0,
          minorGridLineWidth: 0
        },
        exporting: {
          enabled: false
        },
        rangeSelector: {
          selected: 0,
          buttons: [{
            type: 'month',
            count: 1,
            text: '1m'
          }, {
            type: 'year',
            count: 1,
            text: '1y'
          }, {
            type: 'all',
            text: 'All'
          }],
          buttonTheme: {
            fill: 'none',
            r: 5,
            style: {
              color: '#D5DBE4'
            },
            states: {
              hover: {
                fill: '#D5DBE4',
                style: {
                  color: '#000'
                }
              },
              select: {
                fill: '#FF5987',
                style: {
                  color: '#D5DBE4',
                  fontWeight: '700'
                }
              }
            }
          },
          labelStyle: {
            color: 'silver',
            fontWeight: '700'
          },
          inputEnabled: false
        }
      }

      config.title = {
        text: this.title,
        style: {
          color: '#D5DBE4',
          fontSize: '1.6rem',
          fontWeight: '700'
        }
      }
      config.series = this.series
      return config
    }
  }
}
</script>
