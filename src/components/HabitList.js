import React from 'react'
import { graphql } from 'react-apollo'
import HabitContainer from './HabitContainer'
import { withStyles } from 'material-ui/styles'
import { allHabitsQuery } from '../queries'

const styles = theme => {
  console.log(theme)
  return {
    root: {
      padding: theme.spacing.unit * 2
    }
  }
}

class HabitList extends React.Component {
  render() {
    const { allHabitsQuery, classes } = this.props

    if (allHabitsQuery && allHabitsQuery.loading) {
      return <div>loading..</div>
    }

    const habits = allHabitsQuery.allHabits

    console.log(this.props)

    return (
      <div className={classes.root}>
        {habits.map(habit => (
          <HabitContainer key={habit.id} habit={habit} history={this.props.history} />
        ))}
      </div>
    )
  }
}

export default graphql(allHabitsQuery, { name: 'allHabitsQuery' })(withStyles(styles)(HabitList))
