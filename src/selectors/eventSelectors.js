import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'
import moment from 'moment'

const getEventsFromArguments = arg => arg.events ? arg.events.records : arg

export const findEventById = createCachedSelector(
  getEventsFromArguments,
  (state, eventId) => Number(eventId),
  (events, eventId) => {
    return events.find(event => event.id === eventId)
  }
)((state, eventId) => eventId)

export const findActiveEvents = createSelector(
  getEventsFromArguments,
  events => events.filter(event => {
    return event.isVisible && moment().isBetween(event.activeAt, event.activeUntil)
  })
)

export const findUpComingEvents = createSelector(
  getEventsFromArguments,
  events => events.filter(event => {
    const activeAt = moment(event.activeAt)
    return event.isVisible && moment().isBefore(activeAt)
  })
)
