import React from 'react'

const VerticalList = ({ className, items, listItemRendered }) =>
  <ul className={className}>
    {items.map(item =>
      listItemRendered(item)
    )}
  </ul>

export default VerticalList
