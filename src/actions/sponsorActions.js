import moment from 'moment'
import { actionKeys } from './actionTypes'
import { crudTypes, createCrudTypes, createAction } from '../store/crudHelpers'
import createCrudService from '../services/createCrudService'
import { displaySnackbar } from './uiActions'
import { loginActions } from '.'
import { INITIAL_ID } from '../constants'
import { isNewlyCreated } from '../store/helpers'
import { displayErrorMessage, isUnauthorized, parseResponseError } from './helpers'

const sponsorPublicCrud = createCrudService('/api/contents/sponsors')
const sponsorPrivateCrud = createCrudService('/api/intra/sponsors', true)

const initialItem = { id: INITIAL_ID, name: 'Uusi', link: '', logo: '', description: null, activeAt: moment().format(), activeUntil: moment().add(1, 'year').format() }

const SPONSOR = createCrudTypes(actionKeys.sponsor)

const sponsorActions = {
  pending: (crudType) => createAction(SPONSOR[crudType].PENDING),
  success: (response, crudType) => createAction(SPONSOR[crudType].SUCCESS, { response }),
  error: (error, crudType) => createAction(SPONSOR[crudType].ERROR, { error }),
  clearErrors() { return this.error({}, crudTypes.UPDATE) },
  fetchSponsor(sponsorId) {
    return dispatch => {
      dispatch(this.pending(crudTypes.FETCH))
      sponsorPublicCrud.fetchById(sponsorId)
        .then(response => {
          dispatch(this.success(response, crudTypes.FETCH))
        }).catch(err => {
          const message = 'Yhteistyökumppaneiden noutaminen epäonnistui'
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.FETCH))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/login'))
          })
        })
    }
  },
  fetchSponsors(attemptAuthorizedRoute) {
    return dispatch => {
      dispatch(this.pending(crudTypes.FETCH))
      const api = attemptAuthorizedRoute ? sponsorPrivateCrud : sponsorPublicCrud
      api.fetchAll()
        .then(response => {
          dispatch(this.success(response, crudTypes.FETCH))
        }).catch(err => {
          const message = 'Yhteistyökumppaneiden noutaminen epäonnistui'
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.FETCH))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/login'))
          })
        })
    }
  },
  prepareNew() {
    return (dispatch, getState) => !getState().sponsors.records.find(isNewlyCreated) && dispatch(this.success(initialItem, crudTypes.CREATE))
  },
  addSponsor(sponsor) {
    return dispatch => {
      dispatch(this.pending(crudTypes.CREATE))
      sponsorPrivateCrud.create(sponsor)
        .then(response => {
          dispatch(this.success(response, crudTypes.CREATE))
          if(isNewlyCreated(sponsor)) {
            dispatch(this.success(sponsor, crudTypes.DELETE)) // remove temporary item
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
  updateSponsor(sponsor) {
    return dispatch => {
      dispatch(this.pending(crudTypes.UPDATE))
      sponsorPrivateCrud.update(sponsor)
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
  removeSponsor(sponsor) {
    return dispatch => {
      const isUnsavedItem = sponsor.id < 0
      if(isUnsavedItem) {
        return dispatch(this.success(sponsor, crudTypes.DELETE))
      }
      dispatch(this.pending(crudTypes.DELETE))
      sponsorPrivateCrud.performDelete(sponsor)
        .then(response => {
          dispatch(this.success(sponsor, crudTypes.DELETE))
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

export default sponsorActions
export { SPONSOR }
