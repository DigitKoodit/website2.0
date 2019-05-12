import { actionKeys } from './actionTypes'
import { crudTypes, createCrudTypes, createAction } from '../store/crudHelpers'
import createCrudService from '../services/createCrudService'
import { displaySnackbar } from './uiActions'
import { INITIAL_ID } from '../constants'
import { isNewlyCreated } from '../store/helpers'
import { displayErrorMessage, isUnauthorized, parseResponseError } from './helpers'
import moment from 'moment'
import { loginActions } from '.'

const eventPublicCrud = createCrudService('/api/events')
const eventPrivateCrud = createCrudService('/api/intra/events', true)
const initialItem = {
  id: INITIAL_ID,
  name: 'Uusi',
  activeAt: moment().format(),
  activeUntil: moment().add(1, 'month').format(),
  reservedUntil: null,
  isVisible: false,
  isPublished: true,
  maxParticipants: null,
  reserveCount: 0,
  description: `# Testitapahtuma
  Markdown toimii täälläkin `,

  fields: [
    {
      id: 0,
      name: 'etunimi',
      label: 'Etunimi',
      type: 'text',
      placeholder: null,
      maxLength: 64,
      isTextarea: false,
      fieldName: 'Teksti',
      required: true,
      public: true,
      order: 0
    },
    {
      id: 1,
      name: 'sukunimi',
      label: 'Sukunimi',
      type: 'text',
      placeholder: null,
      maxLength: 64,
      isTextarea: false,
      fieldName: 'Teksti',
      required: true,
      public: true,
      order: 1
    },
    {
      id: 2,
      name: 'sahkoposti',
      label: 'Sähköposti',
      type: 'text',
      placeholder: null,
      maxLength: 64,
      isTextarea: false,
      fieldName: 'Teksti',
      required: true,
      public: true,
      order: 2
    }
  ]
  // TODO: prevent field with name 'id'
}

const EVENT = createCrudTypes(actionKeys.event)
const singular = 'Tapahtuman'
const plural = 'Tapahtumien'

const enrollActions = {
  pending: (crudType) => createAction(EVENT[crudType].PENDING),
  success: (response, crudType) => createAction(EVENT[crudType].SUCCESS, { response }),
  error: (error, crudType) => createAction(EVENT[crudType].ERROR, { error }),
  clearErrors() { return this.error({}, crudTypes.UPDATE) },
  fetchEvent(eventId) {
    return dispatch => {
      dispatch(this.pending(crudTypes.FETCH))
      eventPublicCrud.fetchById(eventId)
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
  fetchEvents(attemptAuthorizedRoute) {
    return dispatch => {
      dispatch(this.pending(crudTypes.FETCH))
      const api = attemptAuthorizedRoute ? eventPrivateCrud : eventPublicCrud
      api.fetchAll()
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
    return (dispatch, getState) => !getState().events.records.find(isNewlyCreated) && dispatch(this.success(initialItem, crudTypes.CREATE))
  },
  addEvent(item) {
    return dispatch => {
      dispatch(this.pending(crudTypes.CREATE))
      eventPrivateCrud.create(item)
        .then(response => {
          dispatch(this.success(response, crudTypes.CREATE))
          if(isNewlyCreated(item)) {
            dispatch(this.success(item, crudTypes.DELETE)) // remove temporary item
            dispatch(displaySnackbar(`${singular} luominen onnistui`))
          }
        }).catch(err => {
          const message = `${singular} luominen epäonnistui`
          parseResponseError(err, message).then(error => {
            dispatch(this.error(error, crudTypes.CREATE))
            dispatch(displayErrorMessage(isUnauthorized(err), message))
            isUnauthorized(err) && dispatch(loginActions.logout('/login'))
          })
        })
    }
  },
  updateEvent(item) {
    return dispatch => {
      dispatch(this.pending(crudTypes.UPDATE))
      eventPrivateCrud.update(item)
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
  removeEvent(item) {
    return dispatch => {
      const isUnsavedItem = isNewlyCreated(item)
      if(isUnsavedItem) {
        return dispatch(this.success(item, crudTypes.DELETE))
      }
      dispatch(this.pending(crudTypes.DELETE))
      eventPrivateCrud.performDelete(item)
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

export default enrollActions
export { EVENT }
