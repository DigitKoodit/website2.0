import React, { Component } from 'react'
import { getCalendarEventsShort } from '../lib/googleUtils'
import { Box, Column, Columns, Content, Tile, Title } from 'bloomer'
import PropTypes from 'prop-types'
import * as _ from 'lodash'
import moment from 'moment'
import 'moment/locale/fi'

class EventsView extends Component {
  state = {
    events: null
  }

  componentDidMount() {
    getCalendarEventsShort()
      .then(events => {
        this.setState({ events })
      })
      .catch(error => {
        console.log('ERROR FETHCING CALENDAR EVENTS', error)
      })
  }

  render() {
    const firstThreeDays = _(this.state.events)
      .toArray()
      .take(3)
      .value()

    // TODO: Add calendar button
    return (
      <Tile isParent style={{padding: 30}}>
        <Tile isChild render={
          props => (
            <Box {...props}>
              <Content>
                <Title>Tapahtumat</Title>
                <Columns>
                  {firstThreeDays.map(renderDay)}
                </Columns>
              </Content>
            </Box>
          )
        } />
      </Tile>
    )
  }
}


const renderDay = (events) => (
  <Column isSize={{ default: '1/3', mobile: '1' }}>
    <div className='is-size-5 pb-2'>
      {moment(events[0].start).format('dddd DD.MM.')}
    </div>
    {events.map(renderEvent)}
  </Column>
)


const renderEvent = ({ start, end, title, location }) => {
  const formattedStart = moment(start).format('HH:mm')
  const formattedEnd = moment(end).format('HH:mm')
  return (
    <div className='pb-2'>
      <span className='has-text-weight-semibold'>{title}</span><br />
      <span className='has-text-grey-light has-text-weight-bold'>{`${formattedStart} - ${formattedEnd}`}</span><br />
      {location && <span className='has-text-grey is-size-6'>{location}</span>}
    </div>
  )
}

renderEvent.propTypes = {
  // start time of event
  start: PropTypes.object,

  // end time of event
  end: PropTypes.object,

  // event title
  title: PropTypes.string,

  // event location
  location: PropTypes.string
}

export default EventsView
