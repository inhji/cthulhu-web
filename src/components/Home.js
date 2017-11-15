import React from "react"
import { withStyles } from "material-ui/styles"
import Typography from "material-ui/Typography"

const styles = theme => ({
  root: {
    padding: 20
  },
  title: {
    textAlign: "center"
  },
  subtitle: {
    textAlign: "center"
  }
})

export default withStyles(styles)(({ classes }) => (
  <div className={classes.root}>
    <Typography className={classes.title} type="display1">
      Cthulhu
    </Typography>
    <Typography className={classes.subtitle} type="subheading">
      A habit tracker that will drive you insane (just kidding, it's just a working title)
    </Typography>
    <Typography type="body2">Features:</Typography>
    <ul>
      <li>
        <Typography type="body2">Notifications</Typography>
      </li>

      <li>
        <Typography type="body2">Offline Mode</Typography>
      </li>

      <li>
        <Typography type="body2">Fine-grained Date and Time settings</Typography>
      </li>
    </ul>
  </div>
))
