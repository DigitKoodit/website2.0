import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types' //
import { VerticalList } from '../../components/Layout/Lists'

const SideNav = ({ items }) =>
  <div className='column' id='left'>
    <div className='bottom'>
      <NavVerticalList items={items} />
    </div>
  </div>

const NavVerticalList = ({ items, level = 0 }) =>
  items.length > 0 && <VerticalList
    className={`menu vertical ${level > 0 ? `margin-sides-${level}` : null}`}
    items={items}
    listItemRenderer={item => (
      <ListItem
        key={item.path}
        item={item}
        level={level} />
    )}
  />

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
    {item.routes && <NavVerticalList items={item.routes} level={level + 1} />}
  </li>

const routeItemPropType = PropTypes.shape({
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
})

SideNav.propTypes = {
  items: PropTypes.arrayOf(routeItemPropType).isRequired
}

ListItem.propTypes = {
  item: routeItemPropType.isRequired,
  level: PropTypes.number
}

export default SideNav
