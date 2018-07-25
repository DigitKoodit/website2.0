import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { NavbarItem } from 'bloomer'

const SiteNavbarItem = ({ state, title, path, subItems, children }) => (
  <NavbarItem>
    <Link
      to={{
        pathname: path,
        state
      }}
      className='menu-item-link'
    >
      {children || title}
    </Link>
    {/* {
      subItems && (
        <div className='submenu'>
          {subItems.map((item, index) => (
            item &&
            <NavbarSubmenuItem
              state={item}
              key={index}
              title={item.title}
              path={path + item.path}
            />
          ))}
        </div>
      )
    } */}
  </NavbarItem >
)

SiteNavbarItem.propTypes = {
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

SiteNavbarItem.defaultProps = {
  subItems: null,
  children: null
}

// const NavbarSubmenuItem = ({ state, title, path }) => (
//   <div className='submenu-item'>
//     <Link
//       to={{
//         pathname: path,
//         ...state
//       }}
//       className='submenu-item-link'>
//       {title}
//     </Link>
//   </div>
// )

// NavbarSubmenuItem.propTypes = {
//   title: PropTypes.string.isRequired,
//   path: PropTypes.string.isRequired,
//   state: PropTypes.object
// }

export default SiteNavbarItem
