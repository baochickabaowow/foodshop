import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                data: [],
                fill: false
            }]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            var zones = {}
            var colours = ["#34495e", "#443583", "#008080", "#FFDAB9", "#FFB6C1", "#808080"]
            response.data['region_metadata'].forEach(data => { 
                var test = {
                    data: [],
                    label: data["name"],
                    fill: false,
                    backgroundColor: colours[this.datacollection.datasets.length],
                    borderColor: colours[this.datacollection.datasets.length]
                }
                zones[data["name"]] = this.datacollection.datasets.length
                this.datacollection.datasets.push(test)
            })
            response.data['items'].forEach(item => {
                this.datacollection.labels.push(item["timestamp"]) 
                Object.keys(item["readings"]["psi_twenty_four_hourly"]).forEach(region => {
                    this.datacollection.datasets[zones[region]].data.push(item["readings"]["psi_twenty_four_hourly"][region])
                })
            })
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}