import { actionKeys } from './actionTypes'
import { createAsyncTypes, createAction } from '../store/helpers'
import { login, logout } from '../services/userService'
import { replace } from 'react-router-redux'

const routeAfterLogout = '/'
const routeAfterLogin = '/intra'

const loginActions = {
  pending: () => createAction(LOGIN.PENDING),
  success: response => createAction(LOGIN.SUCCESS, { response }),
  error: error => createAction(LOGIN.ERROR, { error }),
  logout() {
    return dispatch => {
      logout()
        .then(() => dispatch(replace(routeAfterLogout)))
    }
  },
  startLogin(username, password) {
    return dispatch => {
      if(!username || !password) {
        return dispatch(this.error({
          common: 'Täytä molemmat kentät'
        }))
      }

      dispatch(this.pending())
      login({ username, password })
        .then(user => {
          dispatch(this.success(user))
          dispatch(replace(routeAfterLogin))
        })
        .catch(err => {
          err.response
            ? err.response.json()
              .then(responseBody => {
                const { message, validationErrors = [] } = responseBody
                const errors = validationErrors.reduce((acc, error) => {
                  console.log(error.param)
                  acc[error.param] = error
                  return acc
                }, {})
                dispatch(this.error({ common: message, ...errors }))
              }
              ) : dispatch(this.error({ common: 'Käyttäjänimi tai salasana väärin' }))
        })
    }
  }
}

export default loginActions
export const LOGIN = createAsyncTypes(actionKeys.login)
