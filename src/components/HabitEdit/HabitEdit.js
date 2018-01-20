import React from 'react'
import { graphql, compose } from 'react-apollo'
import {
  Card,
  CardBody,
  Col,
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { getUser } from '../../lib/user'
import { updateHabitMutation, deleteHabitMutation, allHabitsQuery } from '../../lib/queries'

class HabitEdit extends React.Component {
  componentDidMount = () => {
    this.name.value = this.props.habit.name
    this.description.value = this.props.habit.description
    this.threshold.value = this.props.habit.threshold
    this.isGood.checked = this.props.habit.isGood
  }

  handleSubmit = async () => {
    const name = this.name.value
    const description = this.description.value
    const threshold = this.threshold.value
    const isGood = this.isGood.checked
    const days = 0 // days is currently unused

    try {
      const { userId: authorId } = getUser()

      if (!authorId) {
        console.error('No user logged in!')
        return
      }

      await this.props.updateHabitMutation({
        variables: {
          id: this.props.habit.id,
          name,
          description,
          threshold,
          isGood,
          days
        }
      })
      this.props.history.push('/habits')
    } catch (err) {
      console.error(err)
    }
  }

  handleDelete = async () => {
    try {
      await this.props.deleteHabitMutation({
        variables: {
          id: this.props.habit.id
        },
        refetchQueries: [
          {
            query: allHabitsQuery
          }
        ]
      })
      this.props.history.push('/habits')
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <Card>
        <CardBody>
          <Form>
            <legend>Edit Habit</legend>
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
                <ButtonGroup>
                  <Button color="primary" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                  <Button color="danger" onClick={this.handleDelete}>
                    Delete
                  </Button>
                </ButtonGroup>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    )
  }
}

export default compose(
  graphql(deleteHabitMutation, { name: 'deleteHabitMutation' }),
  graphql(updateHabitMutation, { name: 'updateHabitMutation' })
)(withRouter(HabitEdit))
