import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types' //

const SideNav = ({ items }) =>
  <div className='column' id='left'>
    <div className='bottom'>
      <VerticalList items={items} />
    </div>
  </div>

const VerticalList = ({ items, level = 0 }) =>
  <ul className={`menu vertical ${level > 0 ? `margin-sides-${level}` : null}`}>
    {items.map(item =>
      <ListItem
        key={item.path}
        item={item}
        level={level} />
    )}
  </ul>

const ListItem = ({ item, level }) =>
  <li className='menu-item' >
    {item.active ? (
      <Link
        to={item.path}
        className={`menu-item-link ${!item.active ? 'disabled' : ''}`} >
        {item.title}
      </Link>
    ) : <span className={`menu-item-link ${!item.active ? 'disabled' : ''}`}>{item.title}</span>
    }
    {item.routes && <VerticalList items={item.routes} level={level + 1} />}
  </li>

const routeItemPropType = PropTypes.shape({
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
})

SideNav.propTypes = {
  items: PropTypes.arrayOf(routeItemPropType).isRequired
}

VerticalList.propTypes = {
  items: PropTypes.arrayOf(routeItemPropType).isRequired,
  level: PropTypes.number
}

ListItem.propTypes = {
  item: routeItemPropType.isRequired,
  level: PropTypes.number
}

export default SideNav
