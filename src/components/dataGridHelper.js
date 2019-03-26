import React from 'react'
import { DataTypeProvider } from '@devexpress/dx-react-grid'

export const mapToDataGrid = columnSpecs => columnSpecs.reduce((acc, columnSpec) => {
  acc.columns.push({
    name: columnSpec.name,
    title: columnSpec.title
  })
  acc.columnWidths.push({
    columnName: columnSpec.name,
    width: columnSpec.width,
    wordWrapEnabled: !!columnSpec.wordWrapEnabled
  })
  if(columnSpec.customComponent) {
    const Component = columnSpec.customComponent
    acc.customRenderers.push({
      columnName: columnSpec.name,
      Formatter: () => <DataTypeProvider
        formatterComponent={(props) => <Component {...props} {...columnSpec.customComponentProps} />}
        for={[columnSpec.name]}
      />
    })
  } else if(columnSpec.customRenderer) {
    acc.customRenderers.push({
      columnName: columnSpec.name,
      Formatter: () => <DataTypeProvider
        formatterComponent={({ value, row }) => columnSpec.customRenderer(value, row)}
        for={[columnSpec.name]}
      />
    })
  }

  return acc
}, { columns: [], columnWidths: [], customRenderers: [] })
