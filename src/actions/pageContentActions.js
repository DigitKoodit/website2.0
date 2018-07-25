import { actionKeys } from './actionTypes'
import { crudTypes, createCrudTypes, createAction } from '../store/helpers'
import createCrudService from '../services/createCrudService'
import { displaySnackbar } from '../actions/uiActions'
import { loginActions } from '../actions'

const pageItemPublicCrud = createCrudService('/api/content')
const pageItemPrivateCrud = createCrudService('/api/intra/content', true)
const initialItem = { id: -Date.now(), title: '', description: '', published: false, content: '' }

const pageContentActions = {
  pending: (crudType) => createAction(SITE_PAGE[crudType].PENDING),
  success: (response, crudType) => createAction(SITE_PAGE[crudType].SUCCESS, { response }),
  error: (error, crudType) => createAction(SITE_PAGE[crudType].ERROR, { error }),
  fetchPage(pageId) {
    return dispatch => {
      dispatch(this.pending(crudTypes.FETCH))
      pageItemPublicCrud.fetchById(pageId)
        .then(response => {
          dispatch(this.success(response, crudTypes.FETCH))
        }).catch(err => {
          const message = 'Sivun noutaminen epäonnistui'
          dispatch(this.error({ common: message }, crudTypes.FETCH))
          dispatch(displayErrorMessage(isUnauthorized(err), message))
          isUnauthorized(err) && dispatch(loginActions.logout('/login'))
        })
    }
  },
  fetchPages() {
    return dispatch => {
      dispatch(this.pending(crudTypes.FETCH))
      pageItemPrivateCrud.fetchAll()
        .then(response => {
          dispatch(this.success(response, crudTypes.FETCH))
        }).catch(err => {
          const message = 'Sivujen noutaminen epäonnistui'
          dispatch(this.error({ common: message }, crudTypes.FETCH))
          dispatch(displayErrorMessage(isUnauthorized(err), message))
          isUnauthorized(err) && dispatch(loginActions.logout('/login'))
        })
    }
  },
  prepareNew() {
    return dispatch => dispatch(this.success(initialItem, crudTypes.CREATE))
  },
  addPage(pageItem) {
    return dispatch => {
      dispatch(this.pending(crudTypes.CREATE))
      pageItemPrivateCrud.create(pageItem)
        .then(response => {
          dispatch(this.success(response, crudTypes.CREATE))
          // newly added item has to have negative id created in prepareNew()
          pageItem.id < 0 && dispatch(this.success(pageItem, crudTypes.DELETE)) // remove temporary item
          pageItem.id < 0 && dispatch(displaySnackbar('Luominen onnistui'))
        }).catch(err => {
          const message = 'Luominen epäonnistui'
          dispatch(this.error({ common: message }, crudTypes.CREATE))
          pageItem.id < 0 && dispatch(displayErrorMessage(isUnauthorized(err), message))
          isUnauthorized(err) && dispatch(loginActions.logout('/login'))
        })
    }
  },
  updatePage(pageItem) {
    return dispatch => {
      dispatch(this.pending(crudTypes.UPDATE))
      pageItemPrivateCrud.update(pageItem)
        .then(response => {
          dispatch(this.success(response, crudTypes.UPDATE))
          dispatch(displaySnackbar('Tallennus onnistui'))
        }).catch(err => {
          const message = 'Navigaation päivitys epäonnistui'
          dispatch(this.error({ common: message }, crudTypes.UPDATE))
          dispatch(displayErrorMessage(isUnauthorized(err), message))
          isUnauthorized(err) && dispatch(loginActions.logout('/login'))
        })
    }
  },
  removePage(pageItem) {
    return dispatch => {
      const isUnsavedItem = pageItem.id < 0
      if(isUnsavedItem) {
        return dispatch(this.success(pageItem, crudTypes.DELETE))
      }
      dispatch(this.pending(crudTypes.DELETE))
      pageItemPrivateCrud.performDelete(pageItem)
        .then(response => {
          dispatch(this.success(pageItem, crudTypes.DELETE))
          dispatch(displaySnackbar('Poistaminen onnistui'))
        }).catch(err => {
          const message = 'Poistaminen epäonnistui'
          dispatch(this.error({ common: message }, crudTypes.DELETE))
          dispatch(displayErrorMessage(isUnauthorized(err), message))
          isUnauthorized(err) && dispatch(loginActions.logout('/login'))
        })
    }
  }
}

const isUnauthorized = err => err.response && err.response.status === 401

const displayErrorMessage = (isUnauthorized, snackbarMessage) => {
  let message = isUnauthorized ? 'Pääsy kielletty' : snackbarMessage
  return displaySnackbar(message)
}

export default pageContentActions
export const SITE_PAGE = createCrudTypes(actionKeys.sitePage)
