import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { NavbarItem, NavbarDropdown } from 'bloomer'
import { Button } from 'bloomer/lib/elements/Button'
import useToggle from '../hooks/useToggle'
import useWindowSize from '../hooks/useWindowSize'

const SiteNavbarItem = ({ state, title, path, subItems = [], children, isEmphasized, isRedirect }) => {
  const hasSubitems = subItems.length > 0
  const NavItem = hasSubitems ? DropdownNavItem : SimpleNavItem

  if(isRedirect) {
    return (
      <NavItem
        key={title}
        href={path.slice(1)}
        state={state}
        title={title}
      >
        {title}
      </NavItem>
    )
  }
  return (
    path
      ? (
        <NavItem
          key={title}
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
      )
      : <NavbarItem key={title} isHidden='touch'>{children || title}</NavbarItem>
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
  state: PropTypes.object,
  isRedirect: PropTypes.bool
}

const SimpleNavItem = ({ state, href, path, children }) =>
  <NavbarItem
    tag={NavLink}
    exact={path === '/'}
    activeClassName='nav-active'
    href={href}
    to={{ pathname: path, state }} >
    {children}
  </NavbarItem>

SimpleNavItem.propTypes = {
  path: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  state: PropTypes.object,
  href: PropTypes.string
}
const DESKTOP_WIDTH = 1087
const DropdownNavItem = ({ state, path, subItems, children }) => {
  const windowSize = useWindowSize()
  const [isCollapsed, { toggle }] = useToggle(true)

  const showItems = (windowSize.width < DESKTOP_WIDTH && !isCollapsed) || windowSize.width >= DESKTOP_WIDTH

  const onIconPress = event => {
    event.stopPropagation()
    event.preventDefault()
    toggle()
  }

  const icon = showItems
    ? 'fa fa-chevron-up'
    : 'fa fa-chevron-down'
  return (
    <NavbarItem hasDropdown isHoverable>
      <NavbarItem
        tag={NavLink}
        className='nav-collapsible'
        activeClassName='nav-active'
        to={{ pathname: path, state }} >
        {children}
        <Button isInverted isColor='info' onClick={onIconPress} className='is-hidden-desktop'>
          <i className={icon} />
        </Button>
      </NavbarItem>
      {showItems
        ? (
          <NavbarDropdown>
            {subItems.filter(item => !!item).map((item, index) => (
              <NavbarSubmenuItem
                state={item}
                key={index}
                title={item.title}
                path={path + item.path}
              />
            ))
            }
          </NavbarDropdown>
        )
        : null
      }
    </NavbarItem>
  )
}

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
