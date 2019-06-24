import React from 'react'
import { MenuLink } from 'bloomer'
import PropTypes from 'prop-types'
import { VerticalList } from '../../../components/Layout'
import moment from 'moment'
import { isNewlyCreated } from '../../../store/helpers'

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
