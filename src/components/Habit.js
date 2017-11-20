import React from 'react'
import Button from 'material-ui/Button'
import Card, { CardContent, CardHeader, CardActions } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import { withStyles } from 'material-ui/styles'
import WeeklyMap from './WeeklyMap'
import MoodIcon from 'material-ui-icons/Mood'
import MoodBadIcon from 'material-ui-icons/MoodBad'
import { red, green } from 'material-ui/colors'

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2
  },
  avatarGood: {
    background: green[500]
  },
  avatarBad: {
    background: red[500]
  },
  icon: {
    width: 30,
    height: 30
  },
  content: { padding: 0 },
  flexGrow: {
    flex: '1 1 auto'
  }
})

const Habit = ({ habit, weeklyLogs, addHabitLog, editHabit, classes }) => (
  <Card className={classes.root}>
    <CardHeader
      avatar={
        <Avatar
          aria-label="Recipe"
          className={habit.isGood ? classes.avatarGood : classes.avatarBad}
        >
          {habit.isGood ? (
            <MoodIcon className={classes.icon} />
          ) : (
            <MoodBadIcon className={classes.icon} />
          )}
        </Avatar>
      }
      title={habit.name}
      subheader={habit.description}
    />
    <CardContent className={classes.content}>
      <WeeklyMap logs={habit.logs} threshold={habit.threshold} isGood={habit.isGood} />
    </CardContent>
    <CardActions>
      <Button color="accent" onClick={addHabitLog}>
        +1
      </Button>
      <div className={classes.flexGrow} />
      <Button onClick={editHabit}>Edit</Button>
    </CardActions>
  </Card>
)

export default withStyles(styles)(Habit)
