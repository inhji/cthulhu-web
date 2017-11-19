import React from 'react'
import { graphql } from 'react-apollo'
import { createHabitMutation, allHabitsQuery } from '../queries'
import HabitForm from './HabitForm'
import { getUser } from '../lib/user'

class CreateHabit extends React.Component {
  createHabit = async ({ name, description, days, isGood, threshold }) => {
    try {
      const { userId: authorId } = getUser()

      if (!authorId) {
        console.error('No user logged in!')
        return
      }

      await this.props.createHabitMutation({
        variables: {
          name,
          description,
          authorId,
          days,
          isGood,
          threshold
        },
        refetchQueries: [
          {
            query: allHabitsQuery
          }
        ]
      })
      this.props.history.push('/habits')
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return <HabitForm onSubmit={this.createHabit} />
  }
}

export default graphql(createHabitMutation, { name: 'createHabitMutation' })(CreateHabit)
