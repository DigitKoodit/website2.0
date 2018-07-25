import { actionKeys } from './actionTypes'
import { crudTypes, createCrudTypes, createAction } from '../store/helpers'
import createCrudService from '../services/createCrudService'
import { displaySnackbar } from '../actions/uiActions'
import { loginActions } from '../actions'

const navItemPublicCrud = createCrudService('/api/content/navigation')
// Private routes require authorization header
const requireAuth = true
const navItemPrivateCrud = createCrudService('/api/intra/content/navigation', requireAuth)
const initialItem = { id: -Date.now(), title: '', path: '', subItems: [], parentId: null, isCustom: false, weight: 9999, isVisible: false }

const siteNavigationActions = {
  pending: (crudType) => createAction(SITE_NAVIGATION[crudType].PENDING),
  success: (response, crudType) => createAction(SITE_NAVIGATION[crudType].SUCCESS, { response }),
  error: (error, crudType) => createAction(SITE_NAVIGATION[crudType].ERROR, { error }),
  fetchNavigation(attemptAuthorizedRoute) {
    return dispatch => {
      dispatch(this.pending(crudTypes.FETCH))
      const api = attemptAuthorizedRoute ? navItemPrivateCrud : navItemPublicCrud
      api.fetchAll()
        .then(response => {
          dispatch(this.success(response, crudTypes.FETCH))
        }).catch(err => {
          const message = 'Sivunavigaation noutaminen epäonnistui'
          dispatch(this.error({ common: message }, crudTypes.FETCH))
          dispatch(displayErrorMessage(isUnauthorized(err), message))
          isUnauthorized(err) && dispatch(loginActions.logout('/login'))
        })
    }
  },
  prepareNew() {
    return dispatch => dispatch(this.success(initialItem, crudTypes.CREATE))
  },
  addNavItem(navItem) {
    return dispatch => {
      dispatch(this.pending(crudTypes.CREATE))
      navItemPrivateCrud.create(navItem)
        .then(response => {
          dispatch(this.success(response, crudTypes.CREATE))
          // newly added item has to have negative id created in prepareNew()
          navItem.id < 0 && dispatch(this.success(navItem, crudTypes.DELETE)) // remove temporary item
          navItem.id < 0 && dispatch(displaySnackbar('Luominen onnistui'))
        }).catch(err => {
          const message = 'Luominen epäonnistui'
          dispatch(this.error({ common: message }, crudTypes.CREATE))
          navItem.id < 0 && dispatch(displayErrorMessage(isUnauthorized(err), message))
          isUnauthorized(err) && dispatch(loginActions.logout('/login'))
        })
    }
  },
  updateNavigation(navItem) {
    return dispatch => {
      dispatch(this.pending(crudTypes.UPDATE))
      navItemPrivateCrud.update(navItem)
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
  removeNavItem(navItem) {
    return dispatch => {
      const isUnsavedItem = navItem.id < 0
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

export default siteNavigationActions
export const SITE_NAVIGATION = createCrudTypes(actionKeys.siteNavigation)
