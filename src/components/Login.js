import React from 'react'
import { graphql, compose } from 'react-apollo'
import { createUserMutation, signinUserMutation } from '../queries'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
})

class Login extends React.Component {
  state = {
    login: true,
    name: '',
    password: '',
    email: ''
  }

  handleLogin = () => {
    const { email, password } = this.state
    this.props.handleLogin({ email, password })
  }

  handleSignup = () => {
    const { email, password, name } = this.state
    this.props.handleSignup({ email, password, name })
  }

  render() {
    const { classes } = this.props

    return (
      <form className={classes.root}>
        {!this.state.login && (
          <TextField
            fullWidth
            required
            label="Username"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            margin="normal"
          />
        )}

        <TextField
          fullWidth
          required
          label="Email"
          type="email"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
          margin="normal"
        />

        <TextField
          fullWidth
          required
          label="Password"
          type="password"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
          margin="normal"
        />

        <Button
          raised
          color="primary"
          className={classes.button}
          onClick={this.state.login ? this.handleLogin : this.handleSignup}
        >
          {this.state.login ? 'Login' : 'Create Account'}
        </Button>

        <Button
          raised
          className={classes.button}
          onClick={() => this.setState({ login: !this.state.login })}
        >
          {this.state.login
            ? 'create new account?'
            : 'already have an account?'}
        </Button>
      </form>
    )
  }
}

export default compose(
  graphql(createUserMutation, { name: 'createUserMutation' }),
  graphql(signinUserMutation, { name: 'signinUserMutation' })
)(withStyles(styles)(Login))
