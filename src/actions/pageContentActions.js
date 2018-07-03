import { actionKeys } from './actionTypes'
import { crudTypes, createCrudTypes, createAction } from '../store/helpers'
import createCrudService from '../services/createCrudService'

const siteContentPublicCrud = createCrudService('/api/content')
const siteContentCrud = createCrudService('/api/intra/cms/content', true)

const siteContentActions = {
  pending: (crudType) => createAction(SITE_PAGE[crudType] ? SITE_PAGE[crudType].PENDING : SITE_PAGE.PENDING),
  success: (response, crudType) => createAction(SITE_PAGE[crudType] ? SITE_PAGE[crudType].SUCCESS : SITE_PAGE.SUCCESS, { response }),
  error: (error, crudType) => createAction(SITE_PAGE[crudType] ? SITE_PAGE[crudType].ERROR : SITE_PAGE.ERROR, { error }),
  savePage(sitePage) {
    return dispatch => {
      dispatch(this.pending(crudTypes.CREATE))
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
                  dispatch(this.error({ common: message, ...errors }, crudTypes.CREATE))
                }
              })
          }
          dispatch(this.error({ common: 'Sivun tallentaminen ei onnistunut' }))
        })
    }
  }
}

export default siteContentActions
export const SITE_PAGE = createCrudTypes(actionKeys.sitePage)
