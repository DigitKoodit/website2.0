import React from 'react'
import PropTypes from 'prop-types'
import FileDetails from './FileDetails'
import filePropType from './filePropType'

const FileGrid = ({ files, onClick }) => (
  <div className='file-grid'>
    {files.map(file => (
      <FileDetails file={file} />
    ))}
  </div>
)

FileGrid.propTypes = {
  files: PropTypes.arrayOf(filePropType),
  onClick: PropTypes.func
}
export default FileGrid
