import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
// import IconButton from '@material-ui/core/IconButton'
// import DeleteIcon from '@material-ui/icons/Delete'

// const DeleteButton = ({ onExecute }) => (
//   <IconButton
//     onClick={() => {
//       if(window.confirm('Are you sure you want to delete this row?')) {
//         onExecute()
//       }
//     }}
//     title='Poista'
//   >
//     <DeleteIcon />
//   </IconButton>
// )
// DeleteButton.propTypes = {
//   onExecute: PropTypes.func.isRequired
// }

export default class DataGrid extends Component {
  renderFormatter = ({ columnName, Formatter }) => <Formatter key={columnName} />
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
          {columnSpecs.customRenderers.map(this.renderFormatter)}
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
    editingStateColumnExtensions: PropTypes.array
  }).isRequired,
  onCommitChanges: PropTypes.func
}
