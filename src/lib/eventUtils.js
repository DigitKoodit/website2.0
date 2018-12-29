import moment from 'moment'
import map from 'lodash/map'

const addNewEvent = (events, key, event) => {
  const oldEvents = events[key] || []
  return {
    ...events,
    [key]: [...oldEvents, event]
  }
}

const dayRangeKeys = (title, startDate, endDate, isAllDay) => {
  let now = moment(startDate)

  const adjustedEndDate = isAllDay
    ? moment(endDate).subtract(1, 'days')
    : moment(endDate)

  let dates = []

  // this looks icky but I didn't want to add deps for such a simple thing
  while(now.isSameOrBefore(adjustedEndDate)) {
    dates.push(now.format('YYYY-MM-DD'))
    now.add(1, 'days')
  }

  return dates
}

const eventsIntoDayGroups = (events) => {
  const grouped = events
    .sort((a, b) => moment(a.start).diff(moment(b.start)))
    .reduce((acc, event) => {
      const key = moment(event.start).format('YYYY-MM-DD')
      const oldEvents = acc[key] || []
      return {
        ...acc,
        [key]: [...oldEvents, event]
      }
    }, {})
  return map(grouped, (events, date) => ({ events, date }))
}

const eventsIntoDayGroupsAdjusted = (events) => {
  const grouped = events
    .sort((a, b) => moment(a.start).diff(moment(b.start)))
    .reduce((acc, event) => {
      let newAcc = acc
      const dates = dayRangeKeys(event.title, event.start, event.end, event.isAllDay)
      const length = dates.length
      dates.forEach((key, dayNumber) => {
        newAcc = addNewEvent(newAcc, key, { dayNumber, length, ...event })
      })
      return newAcc
    }, {})
  return map(grouped, (events, date) => ({ events, date }))
}

const isAlldayOrMultiday = ({ title, start, end, isAllDay }) => {
  const duration = moment.duration(moment(end).diff(moment(start))).asHours()
  return isAllDay || duration > 24
}

const continuesBefore = (start, date) =>
  moment(start).isBefore(date, 'day')

const continuesAfter = (end, date, isAllDay) => {
  const endDateAdjusted = isAllDay
    ? moment(end).subtract(3, 'hours')
    : moment(end)
  return endDateAdjusted.isAfter(date, 'day')
}



export { eventsIntoDayGroups, eventsIntoDayGroupsAdjusted, isAlldayOrMultiday, continuesBefore, continuesAfter }
