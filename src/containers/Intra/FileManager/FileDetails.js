import React from 'react'
import PropTypes from 'prop-types'

const FileDetails = ({ file }) => {
  // const filepath = `${window.location.origin}/${file.path}`
  return (
    <div />
  )
}

FileDetails.propTypes = {
  file: PropTypes.shape({
    path: PropTypes.string.isRequired
  })
}
export default FileDetails
