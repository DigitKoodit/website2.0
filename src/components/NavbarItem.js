import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NavbarItem = ({ state, title, path, subItems, children }) => (
  <div className='menu-item'>
    <Link
      to={{
        pathname: path,
        ...state
      }}
      className='menu-item-link'
    >
      {children || title}
    </Link>
    {
      subItems && (
        <div className='submenu'>
          {subItems.map(item => (
            <NavbarSubmenuItem
              state={item}
              key={item.path}
              title={item.title}
              path={path + item.path}
            />
          ))}
        </div>
      )
    }
  </div >
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
  ]),
  state: PropTypes.object
}

NavbarItem.defaultProps = {
  subItems: null,
  children: null
}

const NavbarSubmenuItem = ({ state, title, path }) => (
  <div className='submenu-item'>
    <Link
      to={{
        pathname: path,
        ...state
      }}
      className='submenu-item-link'>
      {title}
    </Link>
  </div>
)

NavbarSubmenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  state: PropTypes.object
}

export default NavbarItem
