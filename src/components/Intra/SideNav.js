import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types' //
import { Menu, MenuLabel, MenuLink } from 'bloomer'
import { VerticalList } from '../../components/Layout/Lists'

const SideNav = ({ items }) =>
  <Menu>
    <MenuLabel>Hallinta</MenuLabel>
    <IntraRouteList items={items} />
  </Menu>

const routeItemPropType = PropTypes.shape({
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
})

SideNav.propTypes = {
  items: PropTypes.arrayOf(routeItemPropType).isRequired
}

const IntraRouteList = ({ items }) =>
  items.length > 0 && <VerticalList
    className=''
    items={items}
    listItemRenderer={item => (
      <ListItem
        key={item.path}
        item={item} />
    )}
  />

const ListItem = ({ item }) =>
  <li>
    {item.active ? (
      <MenuLink
        tag={NavLink}
        exact
        to={item.path}
        activeClassName='is-active'
        className={!item.active ? 'disabled' : ''} >
        {item.title}
      </MenuLink>
    )
      : <MenuLink className={!item.active ? 'disabled' : ''}>
        {item.title}
      </MenuLink>
    }
    {item.routes && <IntraRouteList items={item.routes} />}

  </li>

ListItem.propTypes = {
  item: routeItemPropType.isRequired
}

export default SideNav
