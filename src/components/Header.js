import React from "react"
import { withRouter } from "react-router"

import { withStyles } from "material-ui/styles"
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import Typography from "material-ui/Typography"
import Button from "material-ui/Button"
import IconButton from "material-ui/IconButton"
import MenuIcon from "material-ui-icons/Menu"

import Drawer from "./Drawer"
import { getUser } from "../lib/user"

const styles = theme => ({
  root: {
    // marginTop: theme.spacing.unit * 3,
    width: "100%"
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

class Header extends React.Component {
  state = {
    drawerOpen: false
  }

  toggleDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }

  render() {
    const { userId } = getUser()
    const { classes, history } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {userId && (
              <IconButton
                className={classes.menuButton}
                color="contrast"
                aria-label="Menu"
                onClick={() => this.toggleDrawer()}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              type="title"
              color="inherit"
              className={classes.flex}
              onClick={() => history.push("/")}
            >
              Cthulhu
            </Typography>
            {userId ? (
              <Button color="contrast" onClick={() => history.push("/profile")}>
                Profile
              </Button>
            ) : (
              <Button color="contrast" onClick={() => history.push("/login")}>
                Login
              </Button>
            )}
          </Toolbar>
          <Drawer toggleDrawer={this.toggleDrawer} drawerOpen={this.state.drawerOpen} />
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(Header))
