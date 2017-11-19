import React from 'react'
import PropTypes from 'prop-types'
import { toNumber, fromNumber } from '../lib/days_of_week'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import Switch from 'material-ui/Switch'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'

const daysOfWeek = [
  { id: 'mon', text: 'Montag' },
  { id: 'tue', text: 'Dienstag' },
  { id: 'wed', text: 'Mittwoch' },
  { id: 'thu', text: 'Donnerstag' },
  { id: 'fri', text: 'Freitag' },
  { id: 'sat', text: 'Samstag' },
  { id: 'sun', text: 'Sonntag' }
]

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
})

class HabitForm extends React.Component {
  state = {
    name: this.props.habit.name,
    description: this.props.habit.description,
    isGood: this.props.habit.isGood,
    threshold: this.props.habit.threshold,
    days: fromNumber(this.props.habit.days)
  }

  componentWillReceiveProps = ({ habit: { name, description, isGood, threshold, days } }) => {
    this.setState({
      name,
      description,
      isGood,
      threshold,
      days: fromNumber(days)
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name, description, isGood } = this.state
    const threshold = window.parseInt(this.state.threshold)
    const days = toNumber(this.state.days)

    this.props.onSubmit({ name, description, isGood, threshold, days })
  }

  handleDayChange = e => {
    const id = e.target.value
    const days = this.state.days

    this.setState({
      days: {
        ...days,
        [id]: !days[id]
      }
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <TextField
          label="Name"
          fullWidth
          required
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />

        <TextField
          label="Beschreibung"
          fullWidth
          required
          value={this.state.description}
          onChange={e => this.setState({ description: e.target.value })}
        />

        <TextField
          label={this.state.isGood ? 'Minimum pro Tag' : 'Maximum pro Tag'}
          type="number"
          fullWidth
          required
          value={this.state.threshold}
          onChange={e => this.setState({ threshold: e.target.value })}
        />

        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.isGood}
                onChange={(e, checked) => {
                  console.log(e.target.value, checked)
                  this.setState({ isGood: checked })
                }}
              />
            }
            label="Gute Gewohnheit"
          />
        </FormGroup>

        <FormGroup row>
          {daysOfWeek.map(d => (
            <FormControlLabel
              id={d.id}
              key={d.id}
              label={d.text}
              control={
                <Checkbox
                  checked={this.state.days[d.id]}
                  onChange={this.handleDayChange}
                  value={d.id}
                />
              }
            />
          ))}
        </FormGroup>

        <Button raised color="primary" className={classes.button} onClick={this.handleSubmit}>
          Create Habit
        </Button>

        <Button raised color="accent" className={classes.button} onClick={this.props.onSecondary}>
          Delete Habit
        </Button>
      </div>
    )
  }
}

HabitForm.propTypes = {
  habit: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    days: PropTypes.number.isRequired
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSecondary: PropTypes.func
}

HabitForm.defaultProps = {
  habit: {
    name: '',
    description: '',
    days: 0,
    isGood: false,
    threshold: 0
  }
}

export default withStyles(styles)(HabitForm)
