import { actionKeys } from './actionTypes'
import { createAsyncTypes, createAction } from '../store/helpers'
import createCrudService from '../services/createCrudService'

const siteContentPublicCrud = createCrudService('/api/content')
const siteContentCrud = createCrudService('/api/intra/cms/content', true)

const siteContentActions = {
  pending: () => createAction(SITE_PAGE.PENDING),
  success: response => createAction(SITE_PAGE.SUCCESS, { response }),
  error: error => createAction(SITE_PAGE.ERROR, { error }),
  savePage(sitePage) {
    return dispatch => {
      dispatch(this.pending())
      if(!sitePage || !sitePage.id) {
        return dispatch(this.error({ common: 'Sivua ei voida tallentaa' }))
      }
      siteContentCrud.update(sitePage)
        .then(result => {
          dispatch(this.success(result))
        }).catch(err => {
          if(err.response) {
            err.response.json()
              .then(responseBody => {
                const { message, validationErrors } = responseBody
                if(Array.isArray(validationErrors)) {
                  const errors = validationErrors.reduce((acc, error) => {
                    console.warn(error.param)
                    acc[error.param] = error
                    return acc
                  }, {})
                  dispatch(this.error({ common: message, ...errors }))
                }
              })
          }
          dispatch(this.error({ common: 'Sivun tallentaminen ei onnistunut' }))
        })
    }
  }
}

export default siteContentActions
export const SITE_PAGE = createAsyncTypes(actionKeys.sitePage)
