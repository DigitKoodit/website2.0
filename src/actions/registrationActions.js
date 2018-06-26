import { actionKeys } from './actionTypes'
import { createAsyncTypes, createAction } from '../store/helpers'
import { replace } from 'react-router-redux'
import { register, confirmRegistration } from '../services/userService'

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
          dispatch(this.error({ common: 'Rekisteröityminen ei onnistunut' }))
        })
    }
  }
}

export default registrationActions
export const REGISTRATION = createAsyncTypes(actionKeys.registration)
