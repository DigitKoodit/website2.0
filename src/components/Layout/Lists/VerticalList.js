import React from 'react'
import PropTypes from 'prop-types'
import { MenuList } from 'bloomer'

const VerticalList = ({ className, items, listItemRenderer }) =>
  <MenuList className={className}>
    {items.map(item =>
      listItemRenderer(item)
    )}
  </MenuList>

VerticalList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  listItemRenderer: PropTypes.func
}

export default VerticalList
