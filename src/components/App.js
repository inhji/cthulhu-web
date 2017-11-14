import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"

// Routes
import HabitList from "./HabitList"
import CreateHabit from "./CreateHabit"
import EditHabit from "./EditHabit"
import Login from "./Login"
import Notify from "./Notify"
import ProfileContainer from "./ProfileContainer"

import Header from "./Header"
import PrivateRoute from "./PrivateRoute"
import "typeface-roboto"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Switch>
          <PrivateRoute exact path="/profile" component={ProfileContainer} />
          <PrivateRoute exact path="/habits/:id" component={EditHabit} />
          <PrivateRoute exact path="/create" component={CreateHabit} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={HabitList} />
          <Route exact path="/notify" component={Notify} />
        </Switch>
      </div>
    )
  }
}

export default App
