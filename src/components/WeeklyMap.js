import React from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import weeklyLogs from '../lib/weekly_logs'
import { red, green } from 'material-ui/colors'
import moment from 'moment'

const styles = theme => ({
  days: {
    display: 'flex'
  },
  day: {
    flex: '1 0',
    textAlign: 'center'
  },
  dayGood: {
    extend: 'day',
    background: green[400]
  },
  dayGoodCurrent: {
    extend: 'day',
    background: green[500]
  },
  dayBad: {
    extend: 'day',
    background: red[400]
  },
  dayBadCurrent: {
    extend: 'day',
    background: red[500]
  },
  dayNone: {
    extend: 'day',
    background: theme.palette.background.default
  }
})

class WeeklyMap extends React.Component {
  dayClass(value, weekday) {
    const { classes, threshold, isGood } = this.props
    const currentWeekday = moment().weekday()
    const isCurrentDay = currentWeekday === weekday
    const goodDay = isCurrentDay ? classes.dayGoodCurrent : classes.dayGood
    const badDay = isCurrentDay ? classes.dayBadCurrent : classes.dayBad

    if (value === -1) {
      return classes.dayNone
    }

    if (isGood) {
      if (value >= threshold) {
        return goodDay
      } else {
        return badDay
      }
    } else {
      if (value > threshold) {
        return badDay
      } else {
        return goodDay
      }
    }
  }

  render() {
    const { classes, logs } = this.props

    return (
      <div className={classes.days}>
        {weeklyLogs(logs).map((day, index) => (
          <div key={day.name} className={this.dayClass(day.value, index)}>
            <Typography type="body1" className={classes.day}>
              {day.text}
            </Typography>
            <Typography type="body1" className={classes.day}>
              {day.value === -1 ? 0 : day.value}
            </Typography>
          </div>
        ))}
      </div>
    )
  }
}

export default withStyles(styles)(WeeklyMap)
