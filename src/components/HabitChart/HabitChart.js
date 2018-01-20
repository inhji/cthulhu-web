import React, { Component } from 'react'
import weeklyLogs from '../../lib/weekly_logs'
import { Card, CardBody } from 'reactstrap'
import { Bar } from 'react-chartjs-2'

const colorNormal = '#20a8d8'
const colorBad = '#f86c6b'
const colorGood = '#4dbd74'

class Aside extends Component {
  render() {
    const { habit } = this.props
    const { isGood, threshold, name } = habit
    const weeklyLog = weeklyLogs(habit.logs)
    const data = {
      labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
      datasets: [
        {
          label: name,
          backgroundColor: weeklyLog.map(day => {
            const { value } = day
            if (isGood) {
              if (value >= threshold) {
                return colorGood
              } else {
                return colorNormal
              }
            } else {
              if (value > threshold) {
                return colorBad
              } else {
                return colorNormal
              }
            }
          }),
          borderColor: 'rgba(255,255,255,0)',
          data: weeklyLog.map(day => (day.value === -1 ? 0 : day.value))
        }
      ]
    }
    const opts = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            display: true,
            barPercentage: 0.6
          }
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              max: habit.threshold,
              stepSize: 1
            }
          }
        ]
      }
    }

    const logsThisWeek = weeklyLog.reduce((sum, day) => {
      return sum + (day.value === -1 ? 0 : day.value)
    }, 0)

    const habitIcon = isGood => {
      const className = isGood ? 'fa fa-smile-o text-success' : 'fa fa-frown-o text-danger'
      return <i className={className} />
    }

    return (
      <Card>
        <CardBody className="pb-0">
          <h4 className="mb-0">
            {habitIcon(isGood)} {habit.name}
          </h4>
          <p>{logsThisWeek} diese Woche</p>
        </CardBody>
        <div className="chart-wrapper px-3" style={{ height: '100px' }}>
          <Bar data={data} options={opts} height={100} />
        </div>
      </Card>
    )
  }
}

export default Aside
