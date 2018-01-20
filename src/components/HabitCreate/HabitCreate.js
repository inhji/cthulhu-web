import React from 'react'
import { graphql, compose } from 'react-apollo'
import { Card, CardBody, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { getUser } from '../../lib/user'
import { createHabitMutation, allHabitsQuery } from '../../lib/queries'

class HabitCreate extends React.Component {
  handleSubmit = async () => {
    const name = this.name.value
    const description = this.description.value || ''
    const threshold = this.threshold.value || 0
    const isGood = this.isGood.checked
    const days = 0 // days is currently unused
    const { userId: author } = getUser()

    try {
      await this.props.createHabitMutation({
        variables: {
          name,
          description,
          threshold,
          isGood,
          days,
          author
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
    return (
      <Card>
        <CardBody>
          <legend>Add Habit</legend>
          <Form>
            <FormGroup row>
              <Label for="name" sm={2}>
                Name
              </Label>
              <Col sm={10}>
                <Input type="text" name="name" id="name" innerRef={input => (this.name = input)} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="description" sm={2}>
                Description
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  innerRef={input => (this.description = input)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="threshold" sm={2}>
                Threshold
              </Label>
              <Col sm={10}>
                <Input
                  type="number"
                  name="threshold"
                  id="threshold"
                  innerRef={input => (this.threshold = input)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" id="isgood" innerRef={input => (this.isGood = input)} />{' '}
                    Good Habit
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button onClick={this.handleSubmit}>Submit</Button>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    )
  }
}

export default graphql(createHabitMutation, { name: 'createHabitMutation' })(
  withRouter(HabitCreate)
)
