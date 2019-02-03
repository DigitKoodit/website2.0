import { actionKeys } from './actionTypes'
import { crudTypes, createCrudTypes, createAction } from '../store/crudHelpers'
import createCrudService from '../services/createCrudService'
import { displaySnackbar } from './uiActions'
import { loginActions } from '.'
import { INITIAL_ID } from '../constants'
import { isNewlyCreated } from '../store/helpers'
import { displayErrorMessage, isUnauthorized, parseResponseError } from './helpers'

const navItemPublicCrud = createCrudService('/api//navigation')
// Private routes require authorization header
const requireAuth = true
const navItemPrivateCrud = createCrudService('/api/intra/navigation', requireAuth)
const initialItem = { id: INITIAL_ID, title: 'Uusi', path: '', subItems: [], parentId: null, isCustom: false, weight: 9999, showOnNavigation: false, isPublished: false }

const siteNavigationActions = {
  pending: (crudType) => createAction(SITE_NAVIGATION[crudType].PENDING),
  success: (response, crudType) => createAction(SITE_NAVIGATION[crudType].SUCCESS, { response }),
  error: (error, crudType) => createAction(SITE_NAVIGATION[crudType].ERROR, { error }),
  clearErrors() { return this.error({}, crudTypes.UPDATE) },
  fetchNavigation(attemptAuthorizedRoute) {
    return dispatch => {
      dispatch(this.pending(crudTypes.FETCH))
      const api = attemptAuthorizedRoute ? navItemPrivateCrud : navItemPublicCrud
      api.fetchAll()
        .then(response => {
          dispatch(this.success(response, crudTypes.FETCH))
        }).catch(err => {
          const message = 'Sivunavigaation noutaminen epäonnistui'
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.FETCH))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/login'))
          })
        })
    }
  },
  prepareNew() {
    return (dispatch, getState) => !getState().siteNavigation.records.find(isNewlyCreated) && dispatch(this.success(initialItem, crudTypes.CREATE))
  },
  addNavItem(navItem) {
    return dispatch => {
      dispatch(this.pending(crudTypes.CREATE))
      navItemPrivateCrud.create(navItem)
        .then(response => {
          dispatch(this.success(response, crudTypes.CREATE))
          if(isNewlyCreated(navItem)) {
            dispatch(this.success(navItem, crudTypes.DELETE)) // remove temporary item
            dispatch(displaySnackbar('Luominen onnistui'))
          }
        }).catch(err => {
          const message = 'Luominen epäonnistui'
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.CREATE))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/login'))
          })
        })
    }
  },
  updateNavItem(navItem) {
    return dispatch => {
      dispatch(this.pending(crudTypes.UPDATE))
      navItemPrivateCrud.update(navItem)
        .then(response => {
          dispatch(this.success(response, crudTypes.UPDATE))
          dispatch(displaySnackbar('Tallennus onnistui'))
        }).catch(err => {
          const message = 'Navigaation päivitys epäonnistui'
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.UPDATE))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/login'))
          })
        })
    }
  },
  removeNavItem(navItem) {
    return dispatch => {
      const isUnsavedItem = isNewlyCreated(navItem)
      if(isUnsavedItem) {
        return dispatch(this.success(navItem, crudTypes.DELETE))
      }
      dispatch(this.pending(crudTypes.DELETE))
      navItemPrivateCrud.performDelete(navItem)
        .then(response => {
          dispatch(this.success(navItem, crudTypes.DELETE))
          dispatch(displaySnackbar('Poistaminen onnistui'))
        }).catch(err => {
          const message = 'Poistaminen epäonnistui'
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.DELETE))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/login'))
          })
        })
    }
  }
}

export default siteNavigationActions
export const SITE_NAVIGATION = createCrudTypes(actionKeys.siteNavigation)
