import { actionKeys } from './actionTypes'
import { createAsyncTypes, createAction } from '../store/helpers'
import { fetchNavigation } from '../services/siteContentService'
const SITE_NAVIGATION = createAsyncTypes(actionKeys.siteNavigation)

export default SITE_NAVIGATION

export const siteNavigationActions = {
  pending: () => createAction(SITE_NAVIGATION.PENDING),
  success: response => createAction(SITE_NAVIGATION.SUCCESS, { response }),
  error: error => createAction(SITE_NAVIGATION.ERROR, { error }),
  fetchNavigation() {
    return dispatch => {
      dispatch(this.pending())
      fetchNavigation()
        .then(response => {
          dispatch(this.success(response))
        }).catch(err => {
          console.error('Navigaatiota ei voitu ladata', err)
          dispatch(this.error({ common: 'Sisältö ei saataville' }))
        })
    }
  }
}
