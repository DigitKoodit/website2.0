import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fileActions } from '../../../actions'
import { ChooserModal } from '../../../components/Modal'

export class FileChooser extends PureComponent {
  chooserRef = React.createRef()

  componentDidMount() {
    this.props.fetchFiles()
  }

  render() {
    const { files, onSelect } = this.props
    return (
      <ChooserModal
        ref={this.chooserRef}
        modalTitle='Valitse liite'
        placeholder='Liitä kuva tai tiedosto'
        dataSet={files}
        listItemFormatter={item => <>
          <img width='50' src={'/' + item.path} alt={item.filename} />
          <small>{item.filename}</small>
        </>}
        onSelect={file => {
          onSelect(file)
          this.chooserRef.current && this.chooserRef.current.closeModal()
        }}
      />
    )
  }

  static propTypes = {
    files: PropTypes.array.isRequired,
    fetchFiles: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  }
}
const mapStateToProps = (state) => ({
  files: state.files.records
})

const mapDispatchToProps = dispatch => ({
  fetchFiles: () => dispatch(fileActions.fetchFiles())
})

export default connect(mapStateToProps, mapDispatchToProps)(FileChooser)
