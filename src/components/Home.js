import React from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  root: {
    padding: 20,
    textAlign: 'center'
  },
  title: {
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center'
  },
  header: {
    marginBottom: theme.spacing.unit * 3
  }
})

export default withStyles(styles)(({ classes }) => (
  <div className={classes.root}>
    <div className={classes.header}>
      <img alt="Cthulhu Logo" src={process.env.PUBLIC_URL + '/img/cthulhu.png'} width="150" />
      <Typography className={classes.title} type="display1">
        CTHULHU
      </Typography>
      <Typography className={classes.subtitle} type="subheading">
        A habit tracker that will drive you i̩̱̦̹̠̅ͫ̔ͩ̊ͧn̸̟̲̻̖̙̬̏̏̏̾̈́̈́̈s̲̰ͭͮ͌̓̌ͥͣa̞͍̥̰̱̹̲̠̬̅̓ͬ͜͝n̛̝̯͔̫ͪ̃ͭͭ́̽͗ͩͤ͞e̷̷͙͇̲͈̎̊͛ͩ
      </Typography>
    </div>
    <Typography type="body1">Created by: Inhji</Typography>
    <Typography type="body1">Version: 0.1.0</Typography>
  </div>
))
