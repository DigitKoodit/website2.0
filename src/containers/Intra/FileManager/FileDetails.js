import React from 'react'
import moment from 'moment'
import filePropType from './filePropType'
import ImageLink from '../../../components/ImageLink'
// TODO: fix correct route
const apiBaseUrl = 'http://localhost:3001/'

const FileDetails = ({ file }) => {
  return (
    <div className='file-item'>
      <ImageLink
        name={`${file.description} | ${file.filename}`}
        link={apiBaseUrl + file.path}
        imageUrl={apiBaseUrl + file.path}
        maxHeight={100}
      />
      <p>
        {file.description || file.filename} <br />
        {file.createdAt && moment(file.createdAt).format('DDMMYYYY HH:mm:ss')}
      </p>
    </div>
  )
}

FileDetails.propTypes = {
  file: filePropType
}

export default FileDetails
