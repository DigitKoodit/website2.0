/* eslint-disable react/prop-types */

import React, { Component, Fragment } from 'react'
import { getCalendarEventsShort } from '../../lib/googleUtils'
import { eventsIntoDayGroups, eventsIntoDayGroupsAdjusted, isAlldayOrMultiday, continuesBefore, continuesAfter } from '../../lib/eventUtils'
import { Box, Column, Columns, Content, Icon, Tile, Title } from 'bloomer'
import PropTypes from 'prop-types'
import take from 'lodash/take'
import partition from 'lodash/partition'
import filter from 'lodash/filter'
import uniqBy from 'lodash/uniqBy'
import moment from 'moment'
import 'moment/locale/fi'
import '../../styles/eventsView.scss'

class EventView extends Component {
  state = {
    events: []
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
    const today = moment().startOf('day')
    const takeFirstThree = days =>
      take(days.filter(({ date }) => moment(date).isSameOrAfter(today)), 3)

    const firstThreeDays = takeFirstThree(eventsIntoDayGroups(this.state.events))
    const firstThreeDaysAdjusted = takeFirstThree(eventsIntoDayGroupsAdjusted(this.state.events))

    // TODO: Add calendar button
    return (
      <Tile isParent id='bulma-override-tile'>
        <Tile isChild render={
          props => (
            <Box {...props}>
              <Content>
                <Title>Tapahtumat</Title>
                <Columns className="is-marginless">
                  {firstThreeDaysAdjusted.map(renderDayTitle)}
                </Columns>
                {renderMultiDayEventsDesktop(firstThreeDaysAdjusted)}
                <Columns>
                  {firstThreeDaysAdjusted.map(renderDay)}
                </Columns>
              </Content>
            </Box>
          )
        } />
      </Tile>
    )
  }
}

const renderDayTitle = ({ date }, index) => (
  <Column key={index} isSize='1/3' className='is-size-4 is-paddingless has-text-centered pb-4 is-hidden-mobile'>
    {moment(date).format('dddd DD.MM.')}
  </Column>
)

const renderMultiDayEventsDesktop = (firstThreeDays) => {
  const flatten = arr => arr[0]
    ? arr[0].concat(arr[1]).concat(arr[2])
    : []

  const eventsMultiDay = firstThreeDays.map(day =>
    filter(day.events, isAlldayOrMultiday))

  const eventsFlattened = flatten(eventsMultiDay)

  const firstDay = firstThreeDays[0] && firstThreeDays[0].date
  const secondDay = firstThreeDays[1] && firstThreeDays[1].date
  const thirdDay = firstThreeDays[2] && firstThreeDays[2].date
  console.log(firstDay, secondDay, thirdDay)

  return uniqBy(eventsFlattened, 'title')
    .map(({ title, start, end, isAllDay }, index) => {
      const before = continuesBefore(start, firstDay)
      const after = continuesAfter(end, thirdDay, isAllDay)
      const eventLength = eventsFlattened.filter(event => event.title === title).length;
      const columnLength = (eventLength === 1 && 'is-one-third')
        || (eventLength === 2 && 'is-two-thirds')
        || 'is-three-thirds'

      const offset = moment(start).isSameOrAfter(thirdDay) && 'is-offset-two-thirds'
        || moment(start).isSameOrAfter(secondDay) && 'is-offset-one-third'

      const color = multidayEventcolor(index)

      return (
        <Column
          className={`multiday-event is-hidden-mobile mb-3 is-paddingless ${columnLength} ${offset}`}
          key={title}
        >
          <BorderTriangleLeft isVisible={before} color={color} />
          <div
            className={`event-text-box ${color}`}
            style={multidayEventBorderRadius(before, after)}
          >
            {title}
          </div>
          <BorderTriangleRight isVisible={after} color={color} />
        </Column>
      )
    })
}

const renderDay = ({ date, events }, index) => {
  const [eventsMultiDay, eventsSingleDay] = partition(events, isAlldayOrMultiday)

  return (
    <Column key={index} isSize={{ tablet: '1', default: '1/3' }}>
      <div className='is-size-5 pb-2 pl-2 is-hidden-desktop is-hidden-tablet'>
        {moment(date).format('dddd DD.MM.')}
      </div>
      {eventsMultiDay.map((event, index) => renderAllDayEventMobile(event, date, index))}
      {eventsSingleDay.map(renderEvent)}
    </Column>
  )
}

const renderAllDayEventMobile = ({ title, dayNumber, length, start, end, isAllDay }, date, index) => {
  const before = continuesBefore(start, date)
  const after = continuesAfter(end, date, isAllDay)
  const color = multidayEventcolor(index)
  return (
    <div className='multiday-event pb-3 is-hidden-desktop is-hidden-tablet' key={`${date}-${title}`}>
      <BorderTriangleLeft isVisible={before} color={color} />
      <div className={`event-text-box ${color}`} style={multidayEventBorderRadius(before, after)}>
        {title} (Päivä {dayNumber + 1}/{length})
      </div>
      <BorderTriangleRight isVisible={after} color={color} />
    </div>
  )
}

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

const BorderTriangleLeft = ({ isVisible, color }) => (
  <div className={`event-border-triangle left ${color}`} style={{ opacity: isVisible ? 1 : 0 }} />
)

const BorderTriangleRight = ({ isVisible, color }) => (
  <div className={`event-border-triangle right ${color}`} style={{ opacity: isVisible ? 1 : 0 }} />
)

const multidayEventBorderRadius = (before, after) => {
  const beforeRadius = before ? '0' : '5px'
  const afterRadius = after ? '0' : '5px'
  const borderRadius = `${beforeRadius} ${afterRadius} ${afterRadius} ${beforeRadius}`
  return { borderRadius }
}

const multidayEventcolor = index =>
  ((index === 1) && 'color-2')
  || ((index === 2) && 'color-3')
  || ''


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

export default EventView
