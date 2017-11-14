import React from "react"
import { graphql } from "react-apollo"
import HabitContainer from "./HabitContainer"
import { allHabitsQuery } from "../queries"
import List from "material-ui/List"

class HabitList extends React.Component {
  render() {
    const { allHabitsQuery } = this.props

    if (allHabitsQuery && allHabitsQuery.loading) {
      return <div>loading..</div>
    }

    const habits = allHabitsQuery.allHabits

    return <List>{habits.map(habit => <HabitContainer key={habit.id} habit={habit} />)}</List>
  }
}

export default graphql(allHabitsQuery, { name: "allHabitsQuery" })(HabitList)
