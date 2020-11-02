import React, { useState } from 'react'
import { MenuLink, Button } from 'bloomer'
import PropTypes from 'prop-types'
import { VerticalList } from '../../../components/Layout'
import moment from 'moment'
import { isNewlyCreated } from '../../../store/helpers'
import take from 'lodash/take'

const EventList = ({ events, onItemClick }) => {
  const NUMBER_OF_SHOWN_EVENTS = 10
  const [isOpen, toggleIsOpen] = useState(false)
  const eventsReversed = [...events].reverse()
  const eventsShown = isOpen
    ? eventsReversed
    : take(eventsReversed, NUMBER_OF_SHOWN_EVENTS)

  return (
    <>
      <VerticalList
        items={eventsShown}
        listItemRenderer={event => (
          <ListItem
            key={event.id}
            item={event}
            onItemClick={onItemClick} />
        )}
      />
      {events.length > NUMBER_OF_SHOWN_EVENTS &&
        <Button onClick={() => toggleIsOpen(!isOpen)}>
          Näytä {isOpen ? 'vähemmän' : 'enemmän'}
        </Button>
      }
    </>
  )
}

const ListItem = ({ item, onItemClick }) => {
  const iconClass = item.isVisible
    ? ''
    : 'fa fa-eye-slash'
  return (
    <li key={item.id} onClick={() => onItemClick(item.id)}>
      <MenuLink className={isNewlyCreated(item) ? 'has-background-info has-text-white-bis' : ''}>
        {item.name}  <i className={`${iconClass} has-text-grey-light`} aria-hidden='true' /> <br />
        <small
          className='has-text-grey-light'>
          {moment(item.activeAt).format('DD.MM.YYYY')}
        </small>
      </MenuLink>
    </li>
  )
}

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isVisible: PropTypes.bool,
    activeAt: PropTypes.string
  }).isRequired,
  onItemClick: PropTypes.func
}

EventList.propTypes = {
  events: PropTypes.array,
  onItemClick: PropTypes.func
}

export default EventList
