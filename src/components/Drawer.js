import React from "react"
import { withRouter } from "react-router"
import { withStyles } from "material-ui/styles"

import List, { ListItem, ListItemText, ListItemIcon } from "material-ui/List"
import Drawer from "material-ui/Drawer"
import Divider from "material-ui/Divider"
import ListIcon from "material-ui-icons/List"
import AddBoxIcon from "material-ui-icons/AddBox"
import PowerSettingsNewIcon from "material-ui-icons/PowerSettingsNew"

import { logout } from "../lib/user"

const styles = theme => ({
  list: {
    width: 250
  },
  drawerHeader: theme.mixins.toolbar
})

const AppDrawer = ({ classes, history, toggleDrawer, drawerOpen }) => (
  <Drawer open={drawerOpen} onRequestClose={toggleDrawer}>
    <div tabIndex={0} role="button" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
      <div className={classes.drawerHeader} />
      <List className={classes.list}>
        <ListItem button onClick={() => history.push("/")}>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="All Habits" />
        </ListItem>
        <ListItem button onClick={() => history.push("/create")}>
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Create Habit" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            logout()
            history.push("/")
          }}
        >
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  </Drawer>
)

export default withStyles(styles)(withRouter(AppDrawer))
