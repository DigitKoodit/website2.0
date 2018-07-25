import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, NavbarMenu, NavbarStart, Columns, Column } from 'bloomer'

const SiteNavbar = ({ header, children }) => (
  <Navbar style={{ border: 'solid 1px', margin: '0' }}>
    <Column>
      {header}
    </Column>
    <NavbarMenu>
      <NavbarStart>
        {children}
      </NavbarStart>
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
