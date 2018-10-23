import { actionKeys } from './actionTypes'
import { crudTypes, createCrudTypes, createAction } from '../store/crudHelpers'
import createCrudService from '../services/createCrudService'
import { displaySnackbar } from './uiActions'
import { INITIAL_ID } from '../constants'
import { displayErrorMessage, isUnauthorized, parseResponseError } from './helpers'
import { loginActions } from '.'

const fileCrud = createCrudService('/api/intra/file', true)
// const uploadCrud = createCrudService('/api/intra/upload', true)

const initialItem = {
  id: INITIAL_ID,
  name: 'Uusi',
  filename: ''
}

const FILE = createCrudTypes(actionKeys.file)
const singular = 'Tiedoston'
const plural = 'Tiedostojen'

const fileActions = {
  pending: (crudType) => createAction(FILE[crudType].PENDING),
  success: (response, crudType) => createAction(FILE[crudType].SUCCESS, { response }),
  error: (error, crudType) => createAction(FILE[crudType].ERROR, { error }),
  clearErrors() { return this.error({}, crudTypes.UPDATE) },
  fetchFile(fileId) {
    return dispatch => {
      dispatch(this.pending(crudTypes.FETCH))
      fileCrud.fetchById(fileId)
        .then(response => {
          dispatch(this.success(response, crudTypes.FETCH))
        }).catch(err => {
          const message = `${singular} noutaminen epäonnistui`
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.FETCH))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/'))
          })
        })
    }
  },
  fetchFiles() {
    return dispatch => {
      dispatch(this.pending(crudTypes.FETCH))
      fileCrud.fetchAll()
        .then(response => {
          dispatch(this.success(response, crudTypes.FETCH))
        }).catch(err => {
          const message = `${plural} noutaminen epäonnistui`
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.FETCH))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/login'))
          })
        })
    }
  },
  prepareNew() {
    return (dispatch, getState) => !getState().files.records.find(item => item.id === INITIAL_ID) && dispatch(this.success(initialItem, crudTypes.CREATE))
  },
  addFile(item) {
    return dispatch => {
      dispatch(this.pending(crudTypes.CREATE))
      fileCrud.create(item)
        .then(response => {
          dispatch(this.success(response, crudTypes.CREATE))
          // newly added item has to have negative id created in prepareNew()
          item.id < 0 && dispatch(this.success(item, crudTypes.DELETE)) // remove temporary item
          item.id < 0 && dispatch(displaySnackbar(`${singular} luominen onnistui`))
        }).catch(err => {
          const message = `${singular} luominen epäonnistui`
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.CREATE))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/login'))
          })
        })
    }
  },
  updateFile(item) {
    return dispatch => {
      dispatch(this.pending(crudTypes.UPDATE))
      fileCrud.update(item)
        .then(response => {
          dispatch(this.success(response, crudTypes.UPDATE))
          dispatch(displaySnackbar(`${singular} tallentaminen onnistui`))
        }).catch(err => {
          const message = `${singular} päivitys epäonnistui`
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.UPDATE))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/'))
          })
        })
    }
  },
  removeFile(item) {
    return dispatch => {
      const isUnsavedItem = item.id < 0
      if(isUnsavedItem) {
        return dispatch(this.success(item, crudTypes.DELETE))
      }
      dispatch(this.pending(crudTypes.DELETE))
      fileCrud.performDelete(item)
        .then(() => {
          dispatch(this.success(item, crudTypes.DELETE))
          dispatch(displaySnackbar(`${singular} poistaminen onnistui`))
        }).catch(err => {
          const message = `${singular} poistaminen epäonnistui`
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.DELETE))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/'))
          })
        })
    }
  }
}

export default fileActions
export { FILE }
