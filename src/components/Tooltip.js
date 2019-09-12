import React from 'react'
import PropTypes from 'prop-types'

const Tooltip = ({ children, message, withoutIcon, className }) => {
  if(withoutIcon) {
    const { className } = children.props || {}
    const tooltippedChild =
      React.cloneElement(children, {
        className: `${className} tooltip is-tooltip-right`,
        'data-tooltip': message
      })
    return tooltippedChild
  }
  return <>
    {children}
    <span className={`tooltip is-tooltip-right ${className}`} data-tooltip={message}>
      <i className='fa fa-question-circle' aria-hidden='true' />
    </span>
  </>
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  message: PropTypes.string,
  withoutIcon: PropTypes.bool,
  className: PropTypes.string
}
export default Tooltip
