import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactDataGrid from 'react-data-grid'
import isString from 'lodash/isString'

const sortRows = (initialRows, sortColumn, sortDirection) => rows => {
  const comparer = (a, b) => {
    const aVal = isString(a[sortColumn]) ? a[sortColumn].toLowerCase() : a[sortColumn]
    const bVal = isString(b[sortColumn]) ? b[sortColumn].toLowerCase() : b[sortColumn]
    if(sortDirection === 'ASC') {
      return aVal > bVal ? 1 : -1
    } else if(sortDirection === 'DESC') {
      return aVal < bVal ? 1 : -1
    }
  }
  return sortDirection === 'NONE' ? initialRows : [...rows].sort(comparer)
}

const ParticipantGrid = ({ columns, initialRows, minHeight = 150 }) => {
  const [rows, setRows] = useState(initialRows)
  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => rows[i]}
      rowsCount={initialRows.length}
      minHeight={800}
      minWidth={'100%'}
      onGridSort={(sortColumn, sortDirection) =>
        setRows(sortRows(initialRows, sortColumn, sortDirection))
      }
    />
  )
}

ParticipantGrid.propTypes = {
  columns: PropTypes.array.isRequired,
  initialRows: PropTypes.array.isRequired,
  minHeight: PropTypes.number
}

export default ParticipantGrid
