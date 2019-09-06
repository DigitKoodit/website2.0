import moment from 'moment'
import map from 'lodash/map'

/**
 *  Return true if an event either
 *    a) does not have a time of date set
 *    b) spans multiple days
 */
const isAlldayOrMultiday = ({ start, end, isAllDay }) => {
  const duration = moment.duration(moment(end).diff(moment(start))).asHours()
  return isAllDay || duration > 24
}

// Return true if the event started the day before
const continuesBefore = (start, date) =>
  moment(start).isBefore(date, 'day')

// Return true if the event continues the next day
const continuesAfter = (end, date, isAllDay) => {
  const endDateAdjusted = isAllDay
    ? moment(end).subtract(3, 'hours')
    : moment(end)

  return endDateAdjusted.isAfter(date, 'day')
}

// Group events into an array of days
const eventsIntoDayGroups = (events) => {
  const grouped = events
    .sort((a, b) => moment(a.start).diff(moment(b.start)))
    .reduce((acc, event) => {
      let newAcc = acc
      const dates = dayRangeKeys(event.start, event.end, event.isAllDay)
      const length = dates.length
      dates.forEach((key, dayNumber) => {
        newAcc = addNewEvent(newAcc, key, { dayNumber, length, ...event })
      })
      return newAcc
    }, {})
  return map(grouped, (events, date) => ({ events, date }))
}

const dayRangeKeys = (startDate, endDate, isAllDay) => {
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

const addNewEvent = (events, key, event) => {
  const oldEvents = events[key] || []
  return {
    ...events,
    [key]: [...oldEvents, event]
  }
}

export { isAlldayOrMultiday, continuesBefore, continuesAfter, eventsIntoDayGroups }
