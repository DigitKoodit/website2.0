import createCachedSelector from 're-reselect'
import { bifurcateBy } from '../lib/utils'
import { parseId } from '../store/helpers'
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
