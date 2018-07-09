import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

const Clickable = ({ item, onClick, className, renderItem }) => {
  const _onClick = () => onClick(item.id)
  return (<div className={className} onClick={_onClick}>
    {renderItem(item)}
  </div>)
}

Clickable.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.object
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  className: PropTypes.string
}

Clickable.defaultProps = {
  className: '',
  onClick: noop
}

export default Clickable
