import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getUser } from '../lib/user'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      getUser().userId ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

export default PrivateRoute
