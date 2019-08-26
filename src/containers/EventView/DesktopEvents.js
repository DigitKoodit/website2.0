import React from 'react'
import PropTypes from 'prop-types'
import { Columns, Column } from 'bloomer'
import moment from 'moment'
import uniqBy from 'lodash/uniqBy'

import { continuesBefore, continuesAfter } from '../../lib/eventUtils'
import { renderSingleDayEvent, multidayEventcolor } from './common'

const DesktopEvents = ({ days }) => (
  <div className='is-hidden-mobile'>
    <Columns className='is-marginless'>
      {days.map(renderDayTitle)}
    </Columns>
    {renderMultiDayEventsDesktop(days)}
    <Columns>
      {days.map(day => (
        <Column>
          {day.eventsSingleDay.map(renderSingleDayEvent)}
        </Column>
      ))}
    </Columns>
  </div>
)

const renderDayTitle = (event, index) => {
  const { date } = event
  return (
    <Column key={index} isSize='1/3' className='is-size-4 is-paddingless pb-4'>
      {moment(date).format('dddd DD.MM.')}
    </Column>
  )
}

const renderMultiDayEventsDesktop = firstThreeDays => {
  const flatten = arr => arr[0]
    ? arr[0].concat(arr[1]).concat(arr[2])
    : []

  const eventsMultiDay = firstThreeDays.map(day => day.eventsMultiDay)

  const eventsFlattened = flatten(eventsMultiDay)

  const firstDay = firstThreeDays[0] && firstThreeDays[0].date
  const secondDay = firstThreeDays[1] && firstThreeDays[1].date
  const thirdDay = firstThreeDays[2] && firstThreeDays[2].date

  return uniqBy(eventsFlattened, 'title')
    .map(({ title, start, end, isAllDay }, index) => {
      const before = continuesBefore(start, firstDay)
      const after = continuesAfter(end, thirdDay, isAllDay)
      const eventLength = eventsFlattened.filter(event => event.title === title).length;
      const columnLength =
        (eventLength === 1 && 'is-one-third') ||
        (eventLength === 2 && 'is-two-thirds') ||
        'is-full'

      const offset =
        (moment(start).isSameOrAfter(thirdDay) && 'is-offset-two-thirds') ||
        (moment(start).isSameOrAfter(secondDay) && 'is-offset-one-third') ||
        ''

      const color = multidayEventcolor(index)

      return (
        <Column
          className={`multiday-event mb-3 is-paddingless ${columnLength} ${offset}`}
          key={title}
        >
          <BorderTriangle isVisible={before} color={color} side='left' />
          <div
            className={`event-text-box ${color}`}
            style={multidayEventBorderRadius(before, after)}
          >
            {title}
          </div>
          <BorderTriangle isVisible={after} color={color} side='right' />
        </Column>
      )
    })
}

const BorderTriangle = ({ isVisible, color, side }) => (
  <div className={`event-border-triangle ${side} ${color}`} style={{ opacity: isVisible ? 1 : 0 }} />
)

BorderTriangle.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  side: PropTypes.string.isRequired
}

// make events that don't continue to the next day have rounded corners
const multidayEventBorderRadius = (before, after) => {
  const beforeRadius = before ? '0' : '5px'
  const afterRadius = after ? '0' : '5px'
  const borderRadius = `${beforeRadius} ${afterRadius} ${afterRadius} ${beforeRadius}`

  return { borderRadius }
}

export default DesktopEvents