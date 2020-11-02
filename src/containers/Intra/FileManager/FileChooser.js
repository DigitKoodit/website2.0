import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fileActions } from '../../../actions'
import { ChooserModal } from '../../../components/Modal'

const FileChooser = ({ fetchFiles, files, isLoading, onSelect }) => {
  const chooserRef = useRef()
  console.log(isLoading, files)
  return (
    <ChooserModal
      ref={chooserRef.current}
      modalTitle='Valitse liite'
      placeholder='Liitä kuva tai tiedosto'
      dataSet={files}
      isLoading={isLoading}
      onOpen={fetchFiles}
      listItemFormatter={item => (
        <>
          <img width='50' src={'/' + item.path} alt={item.filename} />
          <small>{item.filename}</small>
        </>)}
      onSelect={file => {
        onSelect(file)
        this.chooserRef.current && this.chooserRef.current.closeModal()
      }}
    />
  )
}

FileChooser.propTypes = {
  files: PropTypes.array.isRequired,
  fetchFiles: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

const mapStateToProps = (state) => ({
  files: state.files.records,
  isLoading: state.files.loading
})

const mapDispatchToProps = dispatch => ({
  fetchFiles: () => dispatch(fileActions.fetchFiles())
})

export default connect(mapStateToProps, mapDispatchToProps)(FileChooser)
