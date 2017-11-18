import React from 'react'
import moment from 'moment'
import Button from 'material-ui/Button'
import Card, { CardContent, CardActions } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import { red, green } from 'material-ui/colors'
import weeklyLogs from '../lib/weekly_logs'

import ModeEditIcon from 'material-ui-icons/ModeEdit'
import IconButton from 'material-ui/IconButton'

const styles = theme => ({
  card: {
    //display: 'flex'
  },
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
  }
})

const Habit = ({ habit, addHabitLog, editHabit, classes }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography type="headline">{habit.name}</Typography>
      <Typography type="subheading" color="secondary">
        Nicht mehr als 3 Zigaretten am Tag rauchen
      </Typography>
      <div className={classes.days}>
        {weeklyLogs(habit.logs).map((day, index) => (
          <div
            key={day.name}
            className={day.value > habit.threshold ? classes.dayBad : classes.dayGood}
          >
            <Typography type="body1" className={classes.day}>
              {day.text}
            </Typography>
            <Typography type="body1" className={classes.day}>
              {day.value}
            </Typography>
          </div>
        ))}
      </div>
    </CardContent>
    <CardActions>
      <Button color="accent" onClick={addHabitLog}>
        +1
      </Button>
      <Button onClick={editHabit}>Edit</Button>
    </CardActions>
  </Card>
)

export default withStyles(styles)(Habit)

// export default ({ habit, addHabitLog, editHabit }) => (
//   <ListItem button onClick={addHabitLog}>
//     <ListItemText
//       primary={habit.name}
//       secondary={`
//         ${logsFromToday(habit.logs).length} heute // ${logsFromYesterday(habit.logs).length} gestern
//       `}
//     />
//     <ListItemSecondaryAction>
//       <IconButton onClick={editHabit}>
//         <ModeEditIcon />
//       </IconButton>
//     </ListItemSecondaryAction>
//   </ListItem>
// )
