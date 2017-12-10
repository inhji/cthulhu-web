import React from 'react'
import { graphql, compose } from 'react-apollo'
import { createUserMutation, signinUserMutation } from '../queries'
import { setUser } from '../lib/user'
import Login from './Login'

class LoginContainer extends React.Component {
  state = {
    error: null
  }

  handleErrors = e => {
    if (e.graphQLErrors.length) {
      const error = e.graphQLErrors[0]
      this.setState({ error: error.message })
    } else {
      console.error(e)
    }
  }

  handleLogin = async ({ email, password }) => {
    try {
      this.setState({ error: null })
      const result = await this.props.signinUserMutation({
        variables: {
          email,
          password
        }
      })
      const id = result.data.authenticateUser.id
      const token = result.data.authenticateUser.token
      setUser(id, token)
      this.props.history.push('/habits')
    } catch (e) {
      this.handleErrors(e)
    }
  }

  handleSignup = async ({ name, email, password }) => {
    try {
      this.setState({ error: null })
      const result = await this.props.createUserMutation({
        variables: {
          email,
          password,
          name
        }
      })
      const id = result.data.registerUser.id
      const token = result.data.registerUser.token
      setUser(id, token)
    } catch (e) {
      this.handleErrors(e)
    }
  }

  render() {
    return (
      <div>
        <Login
          handleLogin={this.handleLogin}
          handleSignup={this.handleSignup}
          error={this.state.error}
        />
      </div>
    )
  }
}

export default compose(
  graphql(createUserMutation, { name: 'createUserMutation' }),
  graphql(signinUserMutation, { name: 'signinUserMutation' })
)(LoginContainer)
