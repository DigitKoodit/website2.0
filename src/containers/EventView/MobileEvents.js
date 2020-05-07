import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import { renderSingleDayEvent, multidayEventcolor } from './common'

const MobileEvents = ({ days }) => {
  return (
    <div className='is-hidden-desktop'>
      {days.map(({ date, eventsMultiDay, eventsSingleDay }) => (
        <React.Fragment key={date}>
          <h3>{moment(date).format('dddd DD.MM.')}</h3>
          {eventsMultiDay.map((event, idx) => renderAllDayEventMobile(event, date, idx))}
          {eventsSingleDay.map(renderSingleDayEvent)}
        </React.Fragment>
      ))}
    </div>
  )
}

MobileEvents.propTypes = {
  days: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    events: PropTypes.array.isRequired,
    eventsMultiDay: PropTypes.array.isRequired,
    eventsSingleDay: PropTypes.array.isRequired
  }))
}

const renderAllDayEventMobile = (event, date, index) => {
  const { title, dayNumber, length } = event

  // TODO: make color truly unique
  const color = multidayEventcolor(index)

  return (
    <div className='multiday-event pb-3' key={`${index}-${title}`}>
      <div className={`event-text-box mobile ${color}`}>
        {title}
        {length > 1
          ? ` (Päivä ${dayNumber + 1}/${length})`
          : null
        }
      </div>
    </div>
  )
}

export default MobileEvents
