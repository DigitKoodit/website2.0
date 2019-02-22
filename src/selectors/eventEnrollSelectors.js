import createCachedSelector from 're-reselect'
import { INITIAL_ID, NEW_ITEM_URL_KEYWORD } from '../constants'

const parseId = id => id === NEW_ITEM_URL_KEYWORD ? INITIAL_ID : Number(id)
const getEventEnrollsFromArguments = arg => arg.eventEnrolls ? arg.eventEnrolls.records : arg

export const findEventEnrollById = createCachedSelector(
  getEventEnrollsFromArguments,
  (state, eventEnrollId) => parseId(eventEnrollId),
  (eventEnrolls, eventEnrollId) =>
    eventEnrolls.find(eventEnroll => eventEnroll.id === eventEnrollId)
)((state, eventEnrollId) => eventEnrollId)

export const findEventEnrollsByEventId = createCachedSelector(
  getEventEnrollsFromArguments,
  (state, eventId) => parseId(eventId),
  (eventEnrolls, eventId) =>
    eventEnrolls.filter(eventEnroll => eventEnroll.eventId === eventId)
)((state, eventId) => eventId)

export const splitNormalAndSpare = createCachedSelector(
  findEventEnrollsByEventId,
  enrolls => bifurcateBy(enrolls, enroll => enroll.isSpare)
)((state, eventId) => eventId)

const bifurcateBy = (arr, fn) =>
  arr.reduce((acc, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc), [[], []])
