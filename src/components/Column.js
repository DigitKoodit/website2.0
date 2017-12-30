import React from 'react';
import PropTypes from 'prop-types';

import variables from '../public/styles/variables.scss';

const Column = ({ xs, sm, md, lg, children, backgroundColor, textColor, fullSize }) => (
  <div className={`col-xs-${xs} col-sm-${sm} col-md-${md} col-lg-${lg} ` + (fullSize && 'clear-margin clear-padding')}>
    <div
      style={{ backgroundColor, color: textColor }}
    >
      {children}
    </div>
  </div >
)

Column.defaultProps = {
  xs: 12,
  sm: 6,
  md: 6,
  lg: 6,
  backgroundColor: 'transparent',
  textColor: '#444',
  fullSize: false

}
Column.propTypes = {
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  fullSize: PropTypes.bool
}

export default Column;
