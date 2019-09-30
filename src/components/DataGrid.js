import React, { Component } from 'react'
import PropTypes from 'prop-types'
import memoize from 'micro-memoize'
import {
  SortingState,
  IntegratedSorting,
  EditingState
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn
} from '@devexpress/dx-react-grid-material-ui'

const tableLocalizationMessages = {
  noData: 'Ei rivejä'
}

const renderFormatter = memoize(customRenderers =>
  customRenderers.map(({ columnName, Formatter }) => <Formatter key={columnName} />))
export default class DataGrid extends Component {
  render() {
    const { rows, columnSpecs, onCommitChanges } = this.props
    return (
      <div>
        <Grid
          rows={rows}
          columns={columnSpecs.columns}>
          <SortingState
            defaultSorting={[{ columnName: 'id', direction: 'asc' }]}
          />
          <EditingState
            onCommitChanges={onCommitChanges}
            columnExtensions={columnSpecs.editingStateColumnExtensions}
          />
          <IntegratedSorting />
          <Table
            messages={tableLocalizationMessages}
            columnExtensions={columnSpecs.columnWidths} />
          <TableHeaderRow showSortingControls />
          {renderFormatter(columnSpecs.customRenderers)}
          <TableEditRow />
          <TableEditColumn
            // showAddCommand
            showEditCommand
            showDeleteCommand
          />
        </Grid>
      </div>
    )
  }
}

DataGrid.propTypes = {
  rows: PropTypes.array.isRequired,
  columnSpecs: PropTypes.shape({
    columns: PropTypes.array.isRequired,
    columnWidths: PropTypes.array,
    editingStateColumnExtensions: PropTypes.array,
    customRenderers: PropTypes.array
  }).isRequired,
  onCommitChanges: PropTypes.func
}
