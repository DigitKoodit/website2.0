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
    // const nf = []
    // files.forEach(file => {
    //   const reader = new FileReader()
    //   reader.onload = () => {
    //     const fileAsBinaryString = reader.result
    //     console.log(fileAsBinaryString)
    //     // do whatever you want with the file content
    //   }
    //   reader.onabort = () => console.log('file reading was aborted')
    //   reader.onerror = () => console.log('file reading has failed')

    //   nf.push(reader.readAsBinaryString(file))
    // })

    this.setState({
      dropzoneActive: false
    })
    this.props.handleDrop(files)
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
    handleDrop: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired
  }
}

export default Dropzone
