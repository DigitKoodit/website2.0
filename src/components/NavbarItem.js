import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NavbarItem = ({ title, path, subItems, children }) => (
  <div className='menu-item'>
    <Link
      to={path}
      className='menu-item-link'
    >
      {children || title}
    </Link>
    {subItems && (
      <div className='submenu'>
        {subItems.map(item => (
          <NavbarSubmenuItem
            key={item.path}
            title={item.title}
            path={path + item.path}
          />
        ))}
      </div>
    )}
  </div>
)

NavbarItem.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  subItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  })),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
NavbarItem.defaultProps = {
  subItems: null,
  children: null
}

const NavbarSubmenuItem = ({ title, path }) => (
  <div className='submenu-item'>
    <Link
      to={path}
      className='submenu-item-link'>
      {title}
    </Link>
  </div>
)

NavbarSubmenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
}

export default NavbarItem
