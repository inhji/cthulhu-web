import React from 'react'
import { graphql } from 'react-apollo'
import HabitContainer from './HabitContainer'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { allHabitsQuery } from '../queries'

const styles = theme => {
  return {
    root: {
      // padding: theme.spacing.unit * 2,
      margin: '0 auto',
      maxWidth: theme.breakpoints.values.md
    }
  }
}

class HabitList extends React.Component {
  render() {
    const { allHabitsQuery, classes } = this.props

    if (allHabitsQuery && allHabitsQuery.loading) {
      return <div>loading..</div>
    }

    const habits = allHabitsQuery.habits

    return (
      <Grid container className={classes.root}>
        {habits.map(habit => (
          <Grid item xs={12} lg={6} key={habit.id}>
            <HabitContainer habit={habit} history={this.props.history} />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default graphql(allHabitsQuery, { name: 'allHabitsQuery' })(withStyles(styles)(HabitList))
