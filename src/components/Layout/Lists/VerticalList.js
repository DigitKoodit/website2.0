import React from 'react'
import PropTypes from 'prop-types'

const VerticalList = ({ className, items, listItemRenderer }) =>
  <ul className={className}>
    {items.map(item =>
      listItemRenderer(item)
    )}
  </ul>

VerticalList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  listItemRenderer: PropTypes.func
}

export default VerticalList
