import React from "react"
import { graphql, compose } from "react-apollo"
import { GC_USER_ID, GC_AUTH_TOKEN } from "../constants"
import { createUserMutation, signinUserMutation } from "../queries"
import TextField from "material-ui/TextField"
import Button from "material-ui/Button"
import { setUser } from "../lib/user"
import Login from "./Login"

class LoginContainer extends React.Component {
  handleLogin = async (email, password) => {
    const result = await this.props.signinUserMutation({
      variables: {
        email,
        password
      }
    })
    const id = result.data.authenticateUser.id
    const token = result.data.authenticateUser.token
    setUser(id, token)
  }

  handleSignup = async (name, email, password) => {
    const result = await this.props.createUserMutation({
      variables: {
        email,
        password,
        name
      }
    })
    const id = result.data.signupUser.id
    const token = result.data.signupUser.token
    setUser(id, token)
  }

  render() {
    return <Login handleLogin={this.handleLogin} handleSignup={this.handleSignup} />
  }
}

export default compose(
  graphql(createUserMutation, { name: "createUserMutation" }),
  graphql(signinUserMutation, { name: "signinUserMutation" })
)(LoginContainer)
