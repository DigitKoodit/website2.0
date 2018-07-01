import React from 'react'
import PropTypes from 'prop-types'

const Base = ({ children }) =>
  <div className='site-container'>
    <div className='site-content'>
      {children}
    </div>
  </div>

Base.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
export default Base
