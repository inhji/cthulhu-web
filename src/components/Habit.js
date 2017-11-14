import React from "react"
import moment from "moment"
import { ListItem, ListItemText, ListItemSecondaryAction } from "material-ui/List"
import ModeEditIcon from "material-ui-icons/ModeEdit"
import IconButton from "material-ui/IconButton"

const logsFromToday = logs =>
  logs.filter(log => {
    const today = moment().startOf("day")
    const createdAt = moment(log.createdAt)
    return createdAt.isAfter(today)
  })

const logsFromYesterday = (logs, offset = 1) =>
  logs.filter(log => {
    const start = moment()
      .subtract(offset, "days")
      .startOf("day")
    const end = moment()
      .subtract(offset, "days")
      .endOf("day")
    const createdAt = moment(log.createdAt)
    return moment(log.createdAt).isAfter(start) && createdAt.isBefore(end)
  })

export default ({ habit, addHabitLog, editHabit }) => (
  <ListItem button onClick={addHabitLog}>
    <ListItemText
      primary={habit.name}
      secondary={`
        ${logsFromToday(habit.logs).length} heute // ${logsFromYesterday(habit.logs).length} gestern
      `}
    />
    <ListItemSecondaryAction>
      <IconButton onClick={editHabit}>
        <ModeEditIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
)
