import React from 'react'
import { graphql } from 'react-apollo'
import { allHabitsQuery } from '../../lib/queries'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import HabitList from '../../components/HabitList/'
import HabitEdit from '../../components/HabitEdit/'
import HabitCreate from '../../components/HabitCreate/'

class Habits extends React.Component {
  render() {
    const { allHabitsQuery, classes } = this.props

    if (allHabitsQuery && allHabitsQuery.loading) {
      return <div>loading..</div>
    }

    const habits = allHabitsQuery.habits

    return (
      <div className="animated fadeIn">
        <Switch>
          <Route
            exact
            path="/habits/edit/:id"
            name="EditHabit"
            render={({ match }) => {
              const habit = habits.find(habit => habit.id === match.params.id)

              return <HabitEdit habit={habit} />
            }}
          />
          <Route
            exact
            path="/habits/create"
            name="CreateHabit"
            render={({ match }) => {
              return <HabitCreate />
            }}
          />
          <Route path="/habits" name="HabitList" render={() => <HabitList habits={habits} />} />
        </Switch>
      </div>
    )
  }
}

export default graphql(allHabitsQuery, { name: 'allHabitsQuery' })(Habits)
