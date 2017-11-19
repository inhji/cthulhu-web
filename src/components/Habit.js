import React from 'react'
import Button from 'material-ui/Button'
import Card, { CardContent, CardActions } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import WeeklyMap from './WeeklyMap'

const styles = theme => ({})

const Habit = ({ habit, weeklyLogs, addHabitLog, editHabit, classes }) => (
  <Card>
    <CardContent>
      <Typography type="headline">{habit.name}</Typography>
      <Typography type="subheading" color="secondary">
        {habit.description}
      </Typography>
      <WeeklyMap logs={habit.logs} threshold={habit.threshold} isGood={habit.isGood} />
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
