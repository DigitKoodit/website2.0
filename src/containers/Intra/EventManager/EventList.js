import React from 'react'
import { MenuLink } from 'bloomer'
import PropTypes from 'prop-types'
import { VerticalList } from '../../../components/Layout'
import { INITIAL_ID } from '../../../constants'

const EventList = ({ events, onItemClick }) => (
  <VerticalList
    items={events}
    listItemRenderer={event => (
      <ListItem
        key={event.id}
        item={event}
        onItemClick={onItemClick} />
    )}
  />
)

const ListItem = ({ item, onItemClick }) => (
  <li key={item.id} onClick={() => onItemClick(item.id)}>
    <MenuLink className={item.id === INITIAL_ID ? 'has-background-info has-text-white-bis' : ''}>
      {item.name}
    </MenuLink>
  </li>
)

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired,
  onItemClick: PropTypes.func
}

EventList.propTypes = {
  events: PropTypes.array,
  onItemClick: PropTypes.func
}

export default EventList
