import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'
import moment from 'moment'
import { INITIAL_ID } from '../constants'

const getEventsFromArguments = arg => arg.events ? arg.events.records : arg

export const findEventById = createCachedSelector(
  getEventsFromArguments,
  (state, eventId) => eventId === 'new' ? INITIAL_ID : Number(eventId),
  (events, eventId) =>
    events.find(event => event.id === eventId)
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
    return event.isVisible && moment().isBefore(event.activeAt)
  })
)
