import React from 'react';
import PropTypes from 'prop-types';


const Navbar = ({ header, children }) => (
  <div className="navbar">
    <div className="row between-xs middle-xs">
      <div className="col-xs-12 col-md-5">
        {header}
      </div>
      <div className="col-xs-12 col-md-7 center-xs menu">
        {children}
      </div>
    </div >
  </div >

)

Navbar.propTypes = {
  header: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Navbar;
