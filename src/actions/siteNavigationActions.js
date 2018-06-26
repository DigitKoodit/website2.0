import { actionKeys } from './actionTypes'
import { createAsyncTypes, createAction } from '../store/helpers'
import createCrudService from '../services/createCrudService'

const navItemPublicCrud = createCrudService('/api/content/navigation')
const navItemCrud = createCrudService('/api/intra/cms/content/navigation', true)

const siteNavigationActions = {
  pending: () => createAction(SITE_NAVIGATION.PENDING),
  success: response => createAction(SITE_NAVIGATION.SUCCESS, { response }),
  error: error => createAction(SITE_NAVIGATION.ERROR, { error }),
  fetchNavigation() {
    return dispatch => {
      dispatch(this.pending())
      navItemPublicCrud.fetchAll()
        .then(response => {
          dispatch(this.success(response))
        }).catch(err => {
          console.error('Sivun navigointia ei voitu ladata', err)
          dispatch(this.error({ common: 'Sisältö ei saataville' }))
        })
    }
  }
}

export default siteNavigationActions
export const SITE_NAVIGATION = createAsyncTypes(actionKeys.siteNavigation)
