import React, { Component } from 'react'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { Container } from 'reactstrap'

import LoginView from '../../views/Login/'

class Login extends Component {
  render() {
    return (
      <div className="bg-dark">
        <LoginView />
      </div>
    )
  }
}

export default Login
