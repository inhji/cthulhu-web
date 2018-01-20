import React from 'react'
import { Card, CardBody, CardTitle, Button, Table } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'

class HabitList extends React.Component {
  render() {
    const { habits } = this.props

    return (
      <div>
        <Card>
          <CardBody>
            <legend>
              Habits{' '}
              <Button
                color="success"
                size="sm"
                onClick={() => this.props.history.push(`/habits/create`)}
              >
                Create New
              </Button>
            </legend>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {habits.map((habit, i) => (
                  <tr key={i}>
                    <th scope="row">{i}</th>
                    <td>{habit.name}</td>
                    <td>
                      <Button
                        size="sm"
                        color="link"
                        onClick={() => this.props.history.push(`/habits/edit/${habit.id}`)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default withRouter(HabitList)
