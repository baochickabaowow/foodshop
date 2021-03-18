
import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Total Number of each dish",
                backgroundColor: ["#34495e", "#443583", "#008080", "#FFDAB9", "#FFB6C1", "#808080"],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
        }
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => { 
          let temp = doc.data()
          if (!this.datacollection.labels.length) {
            Object.keys(temp).forEach(item => {
              this.datacollection.labels.push(item);
              this.datacollection.datasets[0].data.push(Number(temp[item]))
            })
          } else {
            Object.keys(temp).forEach(item => {
              var index = this.datacollection.labels.indexOf(item);
              var add = Number(temp[item]);
              this.datacollection.datasets[0].data[index] += add;
            })
          }
        })
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created () {
    this.fetchItems()
  }
}