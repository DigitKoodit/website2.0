import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import filePropType from './filePropType'

const FileThumbnail = ({ file, onClick }) => {
  const filepath = `${window.location.origin}/${file.path}`
  return (
    <div className='file-thumbnail' onClick={() => onClick(file)}>
      <div className='center'>
        <img className='file-image' src={filepath} alt={file.description || file.filename} />
      </div>
      <div className='details'>
        <p>
          {file.description || file.filename} <br />
          {file.createdAt && moment(file.createdAt).format('DD.MM.YYYY')}
        </p>
      </div>
    </div>
  )
}

FileThumbnail.propTypes = {
  file: filePropType,
  onClick: PropTypes.func
}

export default FileThumbnail
