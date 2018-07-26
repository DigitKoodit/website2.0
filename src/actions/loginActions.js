import { actionKeys } from './actionTypes'
import { createAsyncTypes, createAction } from '../store/helpers'
import { login, logout } from '../services/userService'
import { replace } from 'react-router-redux'
import { parseResponseError } from './helpers'

const routeAfterLogout = '/'
const routeAfterLogin = '/intra'

const loginActions = {
  pending: () => createAction(LOGIN.PENDING),
  success: response => createAction(LOGIN.SUCCESS, { response }),
  error: error => createAction(LOGIN.ERROR, { error }),
  logout(redirectUrl = routeAfterLogout) {
    return dispatch => {
      logout()
        .then(() => dispatch(replace(redirectUrl)))
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
        .catch(err => dispatch(this.error(parseResponseError(err, 'Käyttäjänimi tai salasana väärin'))))
    }
  }
}

export default loginActions
export const LOGIN = createAsyncTypes(actionKeys.login)
