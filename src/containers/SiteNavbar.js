import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Navbar, NavbarMenu, NavbarEnd } from 'bloomer'

const SiteNavbar = ({ brand, isActive, children, onNavbarClick }) => {
  useEffect(() => {
    const pathname = document.location.pathname
    const el = document.getElementById('root')
    if(pathname === '/iteraatio') {
      el.classList.add('vujut')
    } else {
      el.classList.remove('vujut')
    }
    if(pathname === '/ilmo/28' || pathname === '/ilmo/29') {
      el.classList.add('vujuilmo')
    } else {
      el.classList.remove('vujuilmo')
    }
  })

  return (
    <Navbar className='has-shadow'>
      {brand}
      <NavbarMenu isActive={isActive} onClick={onNavbarClick}>
        <NavbarEnd>{children}</NavbarEnd>
      </NavbarMenu>
    </Navbar>
  )
}

SiteNavbar.propTypes = {
  brand: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element
  ]).isRequired,
  isActive: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onNavbarClick: PropTypes.func
}

export default SiteNavbar
