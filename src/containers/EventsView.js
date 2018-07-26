import React, { Component } from 'react'
import { getCalendarEventsShort } from '../lib/googleUtils'
import { Content, Tile, Box } from 'bloomer'

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
      <Tile isParent style={{ padding: 30 }}>
        <Tile isChild render={
          props => (
            <Box {...props}>
              <Content>
                Tapahtumakalenteri
              </Content>
            </Box>
          )
        } />
      </Tile>
    )
  }
}

export default EventsView
