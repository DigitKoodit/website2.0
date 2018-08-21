import { actionKeys } from './actionTypes'
import { createAsyncTypes, createAction } from '../store/helpers'
import { replace } from 'react-router-redux'
import { register, confirmRegistration } from '../services/userService'
import { parseResponseError } from './helpers'
const routeAfterRegistration = '/registration/continue'

const registrationActions = {
  pending: () => createAction(REGISTRATION.PENDING),
  success: response => createAction(REGISTRATION.SUCCESS, { response }),
  error: error => createAction(REGISTRATION.ERROR, { error }),
  startRegistration(username, email, password) {
    return dispatch => {
      dispatch(this.pending())
      if(!username || !email || !password) {
        return dispatch(this.error({ common: 'Kaikki kentät vaaditaan' }))
      }
      register({ username, email, password })
        .then(user => {
          dispatch(this.success(user))
          dispatch(replace(routeAfterRegistration))
        })
        .catch(err =>
          parseResponseError(err, 'Rekisteröityminen epäonnistui')
            .then(error => dispatch(this.error(error)))
        )
    }
  },
  confirm(email, registrationToken) {
    return dispatch => {
      dispatch(this.pending())
      confirmRegistration(email, registrationToken)
        .then(() => dispatch(this.success()))
        .catch(err =>
          parseResponseError(err, 'Rekisteröityminen epäonnistui')
            .then(error => dispatch(this.error(error)))
        )
    }
  }
}

export default registrationActions
export const REGISTRATION = createAsyncTypes(actionKeys.registration)
