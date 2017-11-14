import React from "react"
import { graphql } from "react-apollo"
import { GC_USER_ID } from "../constants"
import { createHabitMutation, allHabitsQuery } from "../queries"
import HabitForm from "./HabitForm"

class CreateHabit extends React.Component {
  createHabit = async ({ name, days }) => {
    try {
      const authorId = localStorage.getItem(GC_USER_ID)

      if (!authorId) {
        console.error("No user logged in!")
        return
      }

      await this.props.createHabitMutation({
        variables: {
          name,
          authorId,
          days
        },
        refetchQueries: [
          {
            query: allHabitsQuery
          }
        ]
      })
      this.props.history.push("/")
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return <HabitForm onSubmit={this.createHabit} />
  }
}

export default graphql(createHabitMutation, { name: "createHabitMutation" })(CreateHabit)
