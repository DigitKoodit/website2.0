import React from 'react'
import PropTypes from 'prop-types'
import FileThumbnail from './FileThumbnail'
import filePropType from './filePropType'

const FileGrid = ({ files, onClick }) => (
  <div className='file-grid'>
    {files.map(file => (
      <FileThumbnail file={file} onClick={onClick} />
    ))}
  </div>
)

FileGrid.propTypes = {
  files: PropTypes.arrayOf(filePropType),
  onClick: PropTypes.func
}
export default FileGrid
