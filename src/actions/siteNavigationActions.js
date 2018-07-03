import { actionKeys } from './actionTypes'
import { crudTypes, createCrudTypes, createAction } from '../store/helpers'
import createCrudService from '../services/createCrudService'

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
          console.error('Sivun navigointia ei voitu ladata', err)
        })
    }
  }
}

export default siteNavigationActions
export const SITE_NAVIGATION = createCrudTypes(actionKeys.siteNavigation)
