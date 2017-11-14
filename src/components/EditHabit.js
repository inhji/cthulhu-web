import React from "react"
import { graphql, compose } from "react-apollo"
import { withRouter } from "react-router-dom"
import { updateHabitMutation, deleteHabitMutation, habitQuery, allHabitsQuery } from "../queries"
import HabitForm from "./HabitForm"
import { GC_USER_ID } from "../constants"

class EditHabit extends React.Component {
  updateHabit = async ({ name, days }) => {
    try {
      const authorId = localStorage.getItem(GC_USER_ID)

      if (!authorId) {
        console.error("No user logged in!")
        return
      }

      await this.props.updateHabitMutation({
        variables: {
          id: this.props.match.params.id,
          name,
          days
        }
      })
      this.props.history.push("/")
    } catch (err) {
      console.error(err)
    }
  }

  deleteHabit = async () => {
    try {
      await this.props.deleteHabitMutation({
        variables: {
          id: this.props.match.params.id
        },
        refetchQueries: [
          {
            query: allHabitsQuery
          }
        ]
      })
      this.props.history.push("/")
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    if (this.props.habitQuery.loading) {
      return <div>loading...</div>
    }

    return (
      <HabitForm
        onSubmit={this.updateHabit}
        onSecondary={this.deleteHabit}
        habit={this.props.habitQuery.Habit}
      />
    )
  }
}

export default compose(
  graphql(deleteHabitMutation, { name: "deleteHabitMutation" }),
  graphql(updateHabitMutation, { name: "updateHabitMutation" }),
  graphql(habitQuery, {
    name: "habitQuery",
    options: ({ match }) => ({ variables: { id: match.params.id } })
  })
)(withRouter(EditHabit))
