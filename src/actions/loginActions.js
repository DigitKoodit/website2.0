import { actionKeys } from './actionTypes'
import { createAsyncTypes, createAction } from '../store/helpers'
import { login, logout } from '../services/userService'
import { AUTH } from './authActions'
import { replace } from 'react-router-redux'
import { parseResponseError } from './helpers'

const routeAfterLogout = '/'
const routeAfterLogin = '/intra'

const loginActions = {
  pending: () => createAction(LOGIN.PENDING),
  success: response => createAction(LOGIN.SUCCESS, { response }),
  error: error => createAction(LOGIN.ERROR, { error }),
  reset: () => createAction(LOGIN.RESET),
  logout(redirectUrl = routeAfterLogout) {
    return dispatch => {
      logout()
        .then(() => {
          dispatch(createAction(AUTH.RESET))
          dispatch(this.reset())
          dispatch(replace(redirectUrl))
        })
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
        .catch(err =>
          parseResponseError(err, 'Käyttäjänimi tai salasana väärin')
            .then(error =>
              dispatch(this.error(error)))
        )
    }
  }
}

export default loginActions
export const LOGIN = createAsyncTypes(actionKeys.login)
