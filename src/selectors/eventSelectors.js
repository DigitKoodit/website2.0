import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'
import moment from 'moment'
import { INITIAL_ID, NEW_ITEM_URL_KEYWORD } from '../constants'

const parseId = id => id === NEW_ITEM_URL_KEYWORD ? INITIAL_ID : Number(id)
const getEventsFromArguments = arg => arg.events ? arg.events.records : arg

export const findEventById = createCachedSelector(
  getEventsFromArguments,
  (state, eventId) => parseId(eventId),
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
