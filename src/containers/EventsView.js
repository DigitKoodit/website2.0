import React, { Component } from 'react'
import { getCalendarEventsShort } from '../lib/googleUtils'
import { Content } from 'bloomer'

class EventsView extends Component {
  componentDidMount() {
    getCalendarEventsShort()
      .then(events => {
        console.log('TODO display events', events)
      })
      .catch(error => {
        console.log('ERROR FETHCING CALENDAR EVENTS', error)
      })
  }
  render() {
    return (
      <Content>
        Tapahtumakalenteri
      </Content>
    )
  }
}

export default EventsView
