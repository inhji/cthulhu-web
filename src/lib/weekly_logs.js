// 1. Find out what weekday it is
// 2. Get all logs of the current week
// 3. Count how much logs were created on each weekday
// 4. PROFIT!!

import countBy from 'lodash.countby'
import moment from 'moment'
import 'moment/locale/de'

const weeklyLogs = logs => {
  const week = moment().week()
  const weekday = moment().weekday()
  const weekdayNames = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
  const weekdayTexts = ['M', 'D', 'M', 'D', 'F', 'S', 'S']
  const filteredLogs = logs.filter(log => moment(log.createdAt).week() === week)
  const values = countBy(filteredLogs, log => weekdayNames[moment(log.createdAt).weekday()])

  return weekdayNames.map((n, index) => {
    const value = index > weekday ? -1 : values[n] || 0
    const text = weekdayTexts[index]
    const name = weekdayNames[index]

    return { value, text, name }
  })
}

export default weeklyLogs
