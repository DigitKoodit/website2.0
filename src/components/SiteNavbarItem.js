import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { NavbarItem, NavbarDropdown } from 'bloomer'

const SiteNavbarItem = ({ state, title, path, subItems = [], children, isEmphasized }) => {
  const hasSubitems = subItems.length > 0
  const NavItem = hasSubitems ? DropdownNavItem : SimpleNavItem
  return (
    path ? <NavItem
      state={state}
      title={title}
      path={path}
      subItems={subItems} >
      <p style={isEmphasized
        ? {
          color: '#d4af37', // gold
          fontWeight: 900
        }
        : null}>
        {children || title}
      </p>
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
  isEmphasized: PropTypes.bool,
  state: PropTypes.object
}

const SimpleNavItem = ({ state, path, children }) =>
  <NavbarItem
    tag={NavLink}
    exact={path === '/'}
    activeClassName='nav-active'
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

const DropdownNavItem = ({ state, path, subItems, children }) =>
  <NavbarItem hasDropdown isHoverable>
    <NavbarItem
      tag={NavLink}
      activeClassName='nav-active'
      to={{ pathname: path, state }} >
      {children}
    </NavbarItem>
    <NavbarDropdown>
      {subItems.filter(item => !!item).map((item, index) => (
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
    tag={NavLink}
    activeClassName='nav-active'
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

export default SiteNavbarItem
