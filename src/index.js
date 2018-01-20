import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css'
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css'
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

// Apollo Client
import client from './lib/apollo'

import { getUser } from './lib/user'

// Containers
import Full from './containers/Full/'
import Login from './containers/Login/'

ReactDOM.render(
  <ApolloProvider client={client}>
    <HashRouter>
      <Switch>
        <Route path="/login" name="Login" component={Login} />
        <Route
          path="/"
          name="Home"
          render={() => {
            const user = getUser()

            if (!user.authToken) {
              return <Redirect to="/login" />
            }
            return <Full />
          }}
        />
      </Switch>
    </HashRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
