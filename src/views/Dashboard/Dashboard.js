import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Row, Col } from 'reactstrap'
import { allHabitsQuery } from '../../lib/queries'
import HabitChart from '../../components/HabitChart'

class Dashboard extends Component {
  render() {
    const { allHabitsQuery, classes } = this.props

    if (allHabitsQuery && allHabitsQuery.loading) {
      return <div>loading..</div>
    }

    const habits = allHabitsQuery.habits
    return (
      <div className="animated fadeIn">
        <Row>{habits.map(habit => <Col key={habit.id}>{<HabitChart habit={habit} />}</Col>)}</Row>
      </div>
    )
  }
}

export default graphql(allHabitsQuery, { name: 'allHabitsQuery' })(Dashboard)
