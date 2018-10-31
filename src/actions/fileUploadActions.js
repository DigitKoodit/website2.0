import moment from 'moment'
import { actionKeys } from './actionTypes'
import { crudTypes, createCrudTypes, createAction } from '../store/crudHelpers'
import { displaySnackbar } from './uiActions'
import { displayErrorMessage, isUnauthorized, parseResponseError } from './helpers'
import { loginActions } from '.'
import { upload } from '../api/apiHelper'

const baseUrl = '/api/intra/file/upload'

// const upload = (body, contentType) => upload(baseUrl, { body }, true)

const FILE_UPLOAD = createCrudTypes(actionKeys.fileUpload)

const fileUploadActions = {
  pending: (crudType) => createAction(FILE_UPLOAD[crudType].PENDING),
  success: (response, crudType) => createAction(FILE_UPLOAD[crudType].SUCCESS, { response }),
  error: (error, crudType) => createAction(FILE_UPLOAD[crudType].ERROR, { error }),
  clearErrors() { return this.error({}, crudTypes.UPDATE) },
  prepareUpload(files) {
    return (dispatch, getState) => {
      console.log(files)
      const filesWithId = files.map(file => ({
        id: file.name || moment().format(),
        name: file.name,
        preview: file.preview,
        size: file.size,
        type: file.type
      }))
      clearUploadBuffer(getState().fileUploads.records)
      return dispatch(this.success(files, crudTypes.FETCH))
    }
  },
  cancelUploads() {
    return (dispatch, getState) => {
      getState().fileUpload.records.forEach(pendingFile => {
        clearUploadBuffer(getState().fileUploads.records)
        return dispatch(this.success({ id: pendingFile.id }, crudTypes.DELETE))
      })
    }
  },
  uploadFile(files) {
    return dispatch => {
      console.log(files)
      dispatch(this.pending(crudTypes.CREATE))
      const formData = new FormData()
      files.forEach(file =>
        formData.append('uploads', file)
      )
      upload(baseUrl, { body: formData }, true)
        .then(response => {
          dispatch(this.success([], crudTypes.CREATE))
          dispatch(displaySnackbar(`Tiedoston lähettäminen onnistui`))
        }).catch(err => {
          const message = `Tiedoston lähettäminen epäonnistui`
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.CREATE))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/login'))
          })
        })
    }
  }
}

const clearUploadBuffer = files => files.forEach(file => window.URL.revokeObjectURL(file.preview))

export default fileUploadActions
export { FILE_UPLOAD }
