import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { NavbarItem, NavbarDropdown } from 'bloomer'

const SiteNavbarItem = ({ state, title, path, subItems = [], children }) => {
  const hasSubitems = subItems.length > 0
  const NavItem = hasSubitems ? DropdownNavItem : SimpleNavItem
  return (
    path ? <NavItem
      state={state}
      title={title}
      path={path}
      subItems={subItems} >
      {children || title}
    </NavItem>
      : <NavbarItem isHidden='touch'>{children || title}</NavbarItem>
  )
}

SiteNavbarItem.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
  subItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  })),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  state: PropTypes.object
}

const DropdownNavItem = ({ state, path, subItems, children }) =>
  <NavbarItem
    hasDropdown isHoverable>
    <NavbarItem
      tag={Link}
      to={{ pathname: path, state }} >
      {children}
    </NavbarItem>
    <NavbarDropdown>
      {subItems.map((item, index) => (
        <NavbarSubmenuItem
          state={item}
          key={index}
          title={item.title}
          path={path + item.path}
        />
      ))}
    </NavbarDropdown>
  </NavbarItem>

DropdownNavItem.propTypes = {
  path: PropTypes.string,
  subItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  })),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  state: PropTypes.object
}

const NavbarSubmenuItem = ({ state, title, path }) => (
  <NavbarItem
    tag={Link}
    to={{
      pathname: path,
      ...state
    }}>
    {title}
  </NavbarItem>
)

NavbarSubmenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  state: PropTypes.object
}

const SimpleNavItem = ({ state, path, children }) =>
  <NavbarItem
    tag={Link}
    to={{ pathname: path, state }} >
    {children}
  </NavbarItem>

SimpleNavItem.propTypes = {
  path: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  state: PropTypes.object
}
export default SiteNavbarItem
