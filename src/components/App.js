import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { green } from 'material-ui/colors'

// Routes
import HabitList from './HabitList'
import CreateHabit from './CreateHabit'
import EditHabit from './EditHabit'
import LoginContainer from './LoginContainer'
import Notify from './Notify'
import ProfileContainer from './ProfileContainer'
import Home from './Home'

import Header from './Header'
import PrivateRoute from './PrivateRoute'
import 'typeface-roboto'

const theme = createMuiTheme({
  palette: {
    primary: green
  }
})

const styles = theme => ({
  root: {
    background: theme.palette.background.contentFrame
  }
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className={this.props.classes.root}>
          <Header />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={LoginContainer} />
            <Route exact path="/notify" component={Notify} />
            <PrivateRoute exact path="/profile" component={ProfileContainer} />
            <PrivateRoute exact path="/habits" component={HabitList} />
            <PrivateRoute exact path="/habits/:id" component={EditHabit} />
            <PrivateRoute exact path="/create" component={CreateHabit} />
          </Switch>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
