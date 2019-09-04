import React from 'react'
import { Icon } from 'bloomer'
import moment from 'moment'

// render info for a single day event in a column
const renderSingleDayEvent = event => {
  const { start, end, title, location } = event
  const formattedStart = moment(start).format('HH:mm')
  const formattedEnd = moment(end).format('HH:mm')

  return (
    <div key={`${start}-${title}`} className='pb-2'>
      <span className='has-text-weight-semibold'>{title}</span><br />
      <Icon isSize='small' className='fas fa-clock has-text-info mr-1 ml-1' />
      <span className='has-text-grey ml-1'>
        {`${formattedStart} - ${formattedEnd}`}
      </span><br />
      {location && (
        <>
          <Icon isSize='small' className='fas fa-map-marker has-text-info mr-1 ml-1' />
          <span className='has-text-grey is-size-6 ml-1'>{location}</span>
        </>
      )}
    </div>
  )
}

const multidayEventcolor = index =>
  ((index === 1) && 'color-2') ||
  ((index === 2) && 'color-3') ||
  ''

export { renderSingleDayEvent, multidayEventcolor }
