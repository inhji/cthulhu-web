import React from 'react'
import { graphql } from 'react-apollo'
import HabitContainer from './HabitContainer'
import { allHabitsQuery } from '../queries'

class HabitList extends React.Component {
  render() {
    const { allHabitsQuery } = this.props

    if (allHabitsQuery && allHabitsQuery.loading) {
      return <div>loading..</div>
    }

    const habits = allHabitsQuery.allHabits

    console.log(this.props)

    return (
      <div>
        {habits.map(habit => (
          <HabitContainer key={habit.id} habit={habit} history={this.props.history} />
        ))}
      </div>
    )
  }
}

export default graphql(allHabitsQuery, { name: 'allHabitsQuery' })(HabitList)
