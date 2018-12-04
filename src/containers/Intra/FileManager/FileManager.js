import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types' //
import { connect } from 'react-redux'
import find from 'lodash/find'
import { Column, Title, Columns, Box, MenuLink } from 'bloomer'
import { fileActions, fileUploadActions } from '../../../actions'
import { BaseContent, VerticalList } from '../../../components/Layout'
import ModelEditor, { EditorField, EditorInput } from '../../../components/Intra/ModelEditor'
import { INITIAL_ID } from '../../../constants'
import Dropzone from '../../../components/Dropzone'

class FileManager extends Component {
  state = {
    activeItemId: null
  }
  componentDidMount() {
    this.props.fetchFiles()
  }

  handleItemClick = itemId => this.setState({ activeItemId: itemId })

  clearSelection = () => this.setState({ activeItemId: null })

  renderEditor = item => <ModelEditor
    item={item}
    onSave={this.state.activeItemId < 0 ? this.props.addFile : this.props.updateFile}
    onCancel={this.clearSelection}
    onRemove={this.removeNavItem}
    renderFields={(item, handleInputChange, updateStateItem) => {
      const isNewlyCreated = item.id < 0
      return (
        <Columns>
          <Column isSize={{ mobile: 'full', tablet: '2/3', desktop: 'narrow' }}>
            {!isNewlyCreated && <EditorField label='ID'>{item.id}</EditorField>}
            <EditorField label='Nimi'>
              <EditorInput
                field='name'
                model={item}
                onChange={handleInputChange} />
            </EditorField>
            <EditorField label='Kuvaus'>
              <EditorInput
                field='description'
                model={item}
                onChange={handleInputChange} />
            </EditorField>
            <EditorField label='Linkki'>
              <EditorInput
                field='link'
                model={item}
                onChange={handleInputChange} />
            </EditorField>
            <EditorField label='Logo'>
              <EditorInput
                field='logo'
                model={item}
                onChange={handleInputChange} />
            </EditorField>
          </Column>
        </Columns>
      )
    }}
  />

  removeItem = item => {
    this.props.removeFile(item)
    this.clearSelection()
  }

  render = () => {
    const { files, fileUploads, uploadFile } = this.props
    const { activeItemId } = this.state
    return (
      <BaseContent>
        <Column>
          <Title>Tiedostot</Title>
          <Columns>
            <Column isFullWidth>
              <FileList
                items={files}
                onItemClick={this.handleItemClick}
                originalItems={files}
              />
              <Dropzone handleDrop={uploadFile}>
                <Box>
                  {(activeItemId && find(files, { id: activeItemId }))
                    ? this.renderEditor(find(files, { id: activeItemId }))
                    : <p>Vedä tiedostoja tähän</p>}
                  {fileUploads.map(file =>
                    <Fragment key={file.name}>
                      <span>{file.name}</span>
                      <img src={file.preview} width='200' alt='upload preview' />
                    </Fragment>
                  )}
                </Box>
              </Dropzone>
            </Column>
          </Columns>
        </Column>
      </BaseContent >
    )
  }
}

FileManager.propTypes = {
  files: PropTypes.array.isRequired,
  fileUploads: PropTypes.array.isRequired,
  fetchFiles: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  addFile: PropTypes.func.isRequired,
  updateFile: PropTypes.func.isRequired,
  removeFile: PropTypes.func.isRequired
}

const FileList = ({ items, originalItems, onItemClick }) => items.length > 0 &&
  <VerticalList
    items={items}
    listItemRenderer={item => (
      <div key={item.id}>
        <p>{item.filename}</p>
        <img width={200} alt={item.filename} src={`http://localhost:3001/${item.path}`} />
      </div>
    )} />

const ListItem = ({ item, onItemClick }) => (
  <li key={item.id} onClick={() => onItemClick(item.id)}>
    <MenuLink className={item.id === INITIAL_ID ? 'has-background-info has-text-white-bis' : ''}>
      {item.filename}
    </MenuLink>
  </li>
)

ListItem.propTypes = {
  item: PropTypes.object,
  onItemClick: PropTypes.func
}

const mapStateToProps = (state) => ({
  files: state.files.records,
  fileUploads: state.fileUploads.records
})

const mapDispatchToProps = (dispatch) => ({
  fetchFiles: () => dispatch(fileActions.fetchFiles(true)),
  fetchFile: fileId => dispatch(fileActions.fetchFile(fileId)),
  addFile: item => dispatch(fileActions.addFile(item)),
  updateFile: item => dispatch(fileActions.updateFile(item)),
  removeFile: item => dispatch(fileActions.removeFile(item)),
  uploadFile: files => dispatch(fileUploadActions.uploadFile(files))
})

export default connect(mapStateToProps, mapDispatchToProps)(FileManager)
