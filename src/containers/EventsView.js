import React, { Component, Fragment } from 'react'
import { getCalendarEventsShort } from '../lib/googleUtils'
import { Box, Column, Columns, Content, Tile, Title, Icon } from 'bloomer'
import PropTypes from 'prop-types'
import values from 'lodash/values'
import take from 'lodash/take'
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
    const firstThreeDays = take(values(this.state.events), 3)
    // TODO: Add calendar button
    return (
      <Tile isParent style={{ padding: 30 }}>
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

const renderDay = (events, index) => (
  <Column key={index} isSize={{ tablet: '1', default: '1/3' }}>
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
    <div key={`${start}-${title}`} className='pb-2'>
      <span className='has-text-weight-semibold'>{title}</span><br />
      <Icon isSize='small' className='fas fa-clock has-text-info mr-1' />
      <span className='has-text-grey'>
        {`${formattedStart} - ${formattedEnd}`}
      </span><br />
      {location && (
        <Fragment>
          <Icon isSize='small' className='fas fa-map-marker has-text-info mr-1' />
          <span className='has-text-grey is-size-6'>{location}</span>
        </Fragment>
      )}
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
