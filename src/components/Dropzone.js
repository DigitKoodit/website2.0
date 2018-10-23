import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDropzone from 'react-dropzone'

class Dropzone extends Component {
  state = {
    dropzoneActive: false
  }

  onDragEnter = () => {
    this.setState({
      dropzoneActive: true
    })
  }

  onDragLeave = () => {
    this.setState({
      dropzoneActive: false
    })
  }

  onDrop = (files) => {
    this.setState({
      files,
      dropzoneActive: false
    })
    this.props.handleFile(files[0])
  }

  render() {
    const { dropzoneActive } = this.state
    return (
      <ReactDropzone
        disableClick
        className='dropzone-container'
        onDrop={this.onDrop}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave} >
        {dropzoneActive && <div className='dropzone'>Pudota tiedostot tähän</div>}
        {this.props.children}
      </ReactDropzone>
    )
  }

  static propTypes = {
    handleFile: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired
  }
}

export default Dropzone
