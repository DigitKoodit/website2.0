import { actionKeys } from './actionTypes'
import { crudTypes, createCrudTypes, createAction } from '../store/crudHelpers'
import createCrudService from '../services/createCrudService'
import { displaySnackbar } from './uiActions'
import { INITIAL_ID } from '../constants'
import { isNewlyCreated } from '../store/helpers'
import { displayErrorMessage, isUnauthorized, parseResponseError } from './helpers'
import { loginActions } from '.'

const eventEnrollPublicCrud = createCrudService('/api/events/{eventId}/enrolls')
const eventEnrollPrivateCrud = createCrudService('/api/intra/events/{eventId}/enrolls', true)
const initialItem = {
  id: INITIAL_ID,
  eventId: null,
  values: []
}

const EVENT_ENROLL = createCrudTypes(actionKeys.eventEnroll)
const singular = 'Ilmoittautumisen'
const plural = 'Ilmoittautumisten'

const eventEnrollActions = {
  pending: (crudType) => createAction(EVENT_ENROLL[crudType].PENDING),
  success: (response, crudType) => createAction(EVENT_ENROLL[crudType].SUCCESS, { response }),
  error: (error, crudType) => createAction(EVENT_ENROLL[crudType].ERROR, { error }),
  clearErrors() { return this.error({}, crudTypes.UPDATE) },
  fetchEventEnroll(eventEnrollId, eventId) {
    return dispatch => {
      dispatch(this.pending(crudTypes.FETCH))
      eventEnrollPrivateCrud.fetchById(eventEnrollId, { eventId })
        .then(response => {
          dispatch(this.success(response, crudTypes.FETCH))
        }).catch(err => {
          const message = `${singular} noutaminen epäonnistui`
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.FETCH))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/'))
          })
        })
    }
  },
  fetchEventEnrolls(eventId, attemptAuthorizedRoute) {
    return dispatch => {
      dispatch(this.pending(crudTypes.FETCH))
      const api = attemptAuthorizedRoute ? eventEnrollPrivateCrud : eventEnrollPublicCrud
      api.fetchAll({ eventId })
        .then(response => {
          dispatch(this.success(response, crudTypes.FETCH))
        }).catch(err => {
          const message = `${plural} noutaminen epäonnistui`
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.FETCH))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/login'))
          })
        })
    }
  },
  prepareNew() {
    return (dispatch, getState) => !getState().eventEnrolls.records.find(isNewlyCreated) && dispatch(this.success(initialItem, crudTypes.CREATE))
  },
  addEventEnroll(item, eventId, { resolve, reject }, attemptAuthorizedRoute) {
    return dispatch => {
      dispatch(this.pending(crudTypes.CREATE))
      const api = attemptAuthorizedRoute ? eventEnrollPrivateCrud : eventEnrollPublicCrud
      api.create(item, { eventId })
        .then(response => {
          dispatch(this.success(response, crudTypes.CREATE))
          if(isNewlyCreated(item)) {
            dispatch(this.success(item, crudTypes.DELETE)) // remove temporary item
          }
          if(response.isSpare) {
            dispatch(displaySnackbar(`Ilmoittautuminen varasijalle onnistui`))
          } else {
            dispatch(displaySnackbar(`Ilmoittautuminen onnistui`))
          }
          dispatch(this.fetchEventEnrolls(eventId))
          resolve()
        }).catch(err => {
          const message = `Ilmoittautuminen epäonnistui`
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.CREATE))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/login'))
            reject(error)
          })
        })
    }
  },
  updateEventEnroll(item, eventId) {
    return dispatch => {
      dispatch(this.pending(crudTypes.UPDATE))
      eventEnrollPrivateCrud.update(item, { eventId })
        .then(response => {
          dispatch(this.success(response, crudTypes.UPDATE))
          dispatch(displaySnackbar(`${singular} tallentaminen onnistui`))
        }).catch(err => {
          const message = `${singular} päivitys epäonnistui`
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.UPDATE))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/'))
          })
        })
    }
  },
  removeEventEnroll(item, eventId) {
    return dispatch => {
      const isUnsavedItem = isNewlyCreated(item)
      if(isUnsavedItem) {
        return dispatch(this.success(item, crudTypes.DELETE))
      }
      dispatch(this.pending(crudTypes.DELETE))
      eventEnrollPrivateCrud.performDelete(item, { eventId })
        .then(() => {
          dispatch(this.success(item, crudTypes.DELETE))
          dispatch(displaySnackbar(`${singular} poistaminen onnistui`))
        }).catch(err => {
          const message = `${singular} poistaminen epäonnistui`
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.DELETE))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/'))
          })
        })
    }
  }
}

export default eventEnrollActions
export { EVENT_ENROLL }
