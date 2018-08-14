import { get } from '../api/apiHelper'
import moment from 'moment'

const CALENDAR_ID = '51n4vtv46paes63es2ddea3vgg%40group.calendar.google.com'
const API_KEY = 'AIzaSyBE5UIEKN3IZQkHwBfpHlCk4EA47BJizPU'
// TODO: limit Google Calendar access to certain domain from https://console.developers.google.com/apis/

const EVENT_COUNT = 12
const dateMax = new Date()
// Fetch next 4 events but not more than six months from now
dateMax.setMonth(new Date().getMonth() + 3)
const TIME_MIN = new Date().toISOString()
const TIME_MAX = dateMax.toISOString()
const shortEventsUrl = `https://content.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?alwaysIncludeEmail=false&maxResults=${EVENT_COUNT}&timeMin=${TIME_MIN}&timeMax=${TIME_MAX}&showDeleted=false&showHiddenInvitations=false&singleEvents=true&key=${API_KEY}&orderBy=startTime`

const allEventsUrl = `https://content.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?&timeMin=${TIME_MIN}&timeMax=${TIME_MAX}&showDeleted=false&showHiddenInvitations=false&singleEvents=true&key=${API_KEY}&orderBy=startTime`

const eventsIntoTheeDayGroups = (events) => {
  return events
    .sort((a, b) => moment(a.start).diff(moment(b.start)))
    .reduce((acc, event) => {
      const key = moment(event.start).format('YYYY-MM-DD')
      const oldEvents = acc[key] || []
      return {
        ...acc,
        [key]: [...oldEvents, event]
      }
    }, {})
}

export const getCalendarEventsShort = () =>
  new Promise((resolve, reject) => {
    get(shortEventsUrl)
      .then(parseCalendarDataSimple) // parse data received from Axios api call
      .then(events => resolve(eventsIntoTheeDayGroups(events)))
      .catch(reason => {
        return reject(reason.response || reason)
      })
  })

export const getCalendarEvents = () =>
  new Promise((resolve, reject) => {
    get(allEventsUrl)
      .then(parseCalendarDataSimple) // parse data received from Axios api call
      .then(events => {
        return resolve(events)
      })
      .catch(reason => {
        return reject(reason.response || reason)
      })
  })

// Returns a promise fullfilled with
const parseCalendarDataSimple = data =>
  new Promise((resolve, reject) => {
    const events = data.items.map((event) => ({
      start: new Date(event.start.date || event.start.dateTime),
      end: new Date(event.end.date || event.end.dateTime),
      title: event.summary,
      description: event.description,
      location: event.location
    }))
    if (events && events.length > 0) {
      return resolve(events)
    }
    throw new Error('No calendar events')
  })
