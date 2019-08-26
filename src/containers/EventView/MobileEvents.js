import React from 'react'
import moment from 'moment'

import { renderSingleDayEvent, multidayEventcolor } from './common'

const MobileEvents = ({ days }) => {
  return (
    <div className='is-hidden-desktop'>
      {days.map(({ date, eventsMultiDay, eventsSingleDay }) => (
        <>
          <h3>{moment(date).format('dddd DD.MM.')}</h3>
          {eventsMultiDay.map((event, idx) => renderAllDayEventMobile(event, date, idx))}
          {eventsSingleDay.map(renderSingleDayEvent)}
        </>
      ))}
    </div>
  )
}

const renderAllDayEventMobile = (event, date, index) => {
  const { title, dayNumber, length  } = event

  // TODO: make color truly unique
  const color = multidayEventcolor(index)

  return (
    <div className='multiday-event pb-3' key={`${date}-${title}`}>
      <div className={`event-text-box mobile ${color}`}>
        {title} (Päivä {dayNumber + 1}/{length})
      </div>
    </div>
  )
}

export default MobileEvents