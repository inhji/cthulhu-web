import React from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  root: {
    margin: '0 auto',
    maxWidth: 1024
  }
})

const Profile = ({ classes, user }) => (
  <div className={classes.root}>
    <Typography type="title">Profile</Typography>

    <ul>
      <li>ID: {user.id}</li>
      <li>Username: {user.name}</li>
      <li>Email: {user.email}</li>
    </ul>
  </div>
)

export default withStyles(styles)(Profile)
