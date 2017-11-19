import React from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import weeklyLogs from '../lib/weekly_logs'
import { red, green } from 'material-ui/colors'

const styles = theme => ({
  days: {
    display: 'flex',
    paddingTop: theme.spacing.unit
  },
  day: {
    flex: '1 0',
    padding: 2,
    textAlign: 'center'
  },
  dayGood: {
    extend: 'day',
    background: green[400]
  },
  dayBad: {
    extend: 'day',
    background: red[400]
  },
  dayNone: {
    extend: 'day',
    background: 'white'
  }
})

class WeeklyMap extends React.Component {
  dayClass(value) {
    const { classes, threshold, isGood } = this.props

    if (value === -1) {
      return classes.dayNone
    }

    if (isGood) {
      if (value >= threshold) {
        return classes.dayGood
      } else {
        return classes.dayBad
      }
    } else {
      if (value > threshold) {
        return classes.dayBad
      } else {
        return classes.dayGood
      }
    }
  }

  render() {
    const { classes, logs } = this.props

    return (
      <div className={classes.days}>
        {weeklyLogs(logs).map((day, index) => (
          <div key={day.name} className={this.dayClass(day.value)}>
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
