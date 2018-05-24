import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ children, fullSize }) => (
  <div
    className={'row ' + (fullSize && 'clear-padding clear-margin')}>
    {children}
  </div >
)

Row.defaultProps = {
  fullSize: false
}

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  fullSize: PropTypes.bool
}

export default Row;
