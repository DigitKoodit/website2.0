import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'
import moment from 'moment'

const getEventsFromArguments = arg => arg.pages ? arg.pages.records : arg

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
    const activeAt = moment(event.activeAt)
    const activeUntil = moment(event.activeAt)
    return moment().isBetween(activeAt, activeUntil)
  })
)
