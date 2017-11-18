import React from 'react'
import Habit from './Habit'
import { graphql } from 'react-apollo'
import { allHabitsQuery, createHabitLogMutation } from '../queries'

class HabitContainer extends React.Component {
  addHabitLog = async () => {
    try {
      await this.props.createHabitLogMutation({
        variables: {
          habitId: this.props.habit.id
        },
        refetchQueries: [
          {
            query: allHabitsQuery
          }
        ]
      })
    } catch (e) {
      console.error(e)
    }
  }

  editHabit = () => {
    this.props.history.push(`/habits/${this.props.habit.id}`)
  }

  render() {
    console.log(this.props)

    return (
      <Habit habit={this.props.habit} addHabitLog={this.addHabitLog} editHabit={this.editHabit} />
    )
  }
}

export default graphql(createHabitLogMutation, {
  name: 'createHabitLogMutation'
})(HabitContainer)
