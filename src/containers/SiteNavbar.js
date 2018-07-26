import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, NavbarMenu, NavbarStart, NavbarEnd, Columns, Column } from 'bloomer'

const SiteNavbar = ({ header, children }) => (
  <Navbar>
    {header}
    <NavbarMenu>
      <NavbarEnd>
        {children}
      </NavbarEnd>
    </NavbarMenu>
  </Navbar>
)

SiteNavbar.propTypes = {
  header: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default SiteNavbar
