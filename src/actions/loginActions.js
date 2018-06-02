import { actionKeys } from './actionTypes'
import { createAsyncTypes, createAction } from '../store/helpers'
import { login, logout, register, confirmRegistration, update, performDelete } from '../services/userService'
import { replace } from 'react-router-redux'

const LOGIN = createAsyncTypes(actionKeys.login)
const routeAfterLogout = '/'
const routeAfterLogin = '/profile'

export default LOGIN

export const loginActions = {
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
      dispatch(this.pending())
      login({ username, password })
        .then(user => {
          dispatch(this.success(user))
          dispatch(replace(routeAfterLogin))
        })
        .catch(() => {
          dispatch(this.error(
            {
              common: 'Käyttäjänimi tai salasana väärin'
            }
          ))
        })
    }
  }
}
