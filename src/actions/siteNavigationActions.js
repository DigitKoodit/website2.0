import { actionKeys } from './actionTypes'
import { crudTypes, createCrudTypes, createAction } from '../store/helpers'
import createCrudService from '../services/createCrudService'
import { displaySnackbar } from '../actions/uiActions'

const navItemPublicCrud = createCrudService('/api/content/navigation')
// Private routes require authorization header
const requireAuth = true
const navItemCrud = createCrudService('/api/intra/cms/content/navigation', requireAuth)

const siteNavigationActions = {
  pending: (crudType) => createAction(SITE_NAVIGATION[crudType].PENDING),
  success: (response, crudType) => createAction(SITE_NAVIGATION[crudType].SUCCESS, { response }),
  error: (error, crudType) => createAction(SITE_NAVIGATION[crudType].ERROR, { error }),
  fetchNavigation() {
    return dispatch => {
      dispatch(this.pending(crudTypes.FETCH))
      navItemPublicCrud.fetchAll()
        .then(response => {
          dispatch(this.success(response, crudTypes.FETCH))
        }).catch(err => {
          console.error('Sivukarttaa ei voitu ladata', err)
          dispatch(this.error({ common: 'Sisältö ei saataville' }, crudTypes.FETCH))
        })
    }
  },
  prepareNew() {
    return dispatch => {
      const dummyItem = { id: -Date.now(), title: '', path: '', subItems: [], parentId: null, isCustom: false, weight: 0, isVisible: false }
      dispatch(this.success(dummyItem, crudTypes.CREATE))
    }
  },
  addNavItem(navItem) {
    return dispatch => {
      dispatch(this.pending(crudTypes.CREATE))
      navItemCrud.create(navItem)
        .then(response => {
          dispatch(this.success(response, crudTypes.CREATE))
          navItem.id < 0 && dispatch(this.success(navItem, crudTypes.DELETE))
          navItem.id < 0 && dispatch(displaySnackbar('Luominen onnistui'))
        }).catch(err => {
          console.error('Navigaation lisäys onnistui', err)
          dispatch(this.error({ common: 'Navigaation lisäys epäonnistui' }, crudTypes.CREATE))
          navItem.id < 0 && dispatch(displaySnackbar('Luominen epäonnistui'))
        })
    }
  },
  updateNavigation(navItem) {
    return dispatch => {
      dispatch(this.pending(crudTypes.UPDATE))
      navItemCrud.update(navItem)
        .then(response => {
          dispatch(this.success(response, crudTypes.UPDATE))
          dispatch(displaySnackbar('Tallennus onnistui'))
        }).catch(err => {
          console.error('Navigaation päivitys epäonnistui', err)
          dispatch(this.error({ common: 'Navigaation päivitys epäonnistui' }, crudTypes.UPDATE))
          dispatch(displaySnackbar('Tallennus epäonnistui'))
        })
    }
  },
  removeNavItem(navItem) {
    return dispatch => {
      // User wants to remove unsaved data
      if(navItem.id < 0) {
        return dispatch(this.success(navItem, crudTypes.DELETE))
      }
      dispatch(this.pending(crudTypes.DELETE))
      navItemCrud.performDelete(navItem)
        .then(response => {
          dispatch(this.success(navItem, crudTypes.DELETE))
          dispatch(displaySnackbar('Poistaminen onnistui'))
        }).catch(err => {
          console.error('Elementin poisto epäonnistui', err)
          dispatch(this.error({ common: 'Elementin poisto epäonnistui' }, crudTypes.DELETE))
          dispatch(displaySnackbar('Poistaminen epäonnistui'))
        })
    }
  }
}

export default siteNavigationActions
export const SITE_NAVIGATION = createCrudTypes(actionKeys.siteNavigation)
