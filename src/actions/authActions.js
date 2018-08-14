import { actionKeys } from './actionTypes'
import { createAsyncTypes, createAction } from '../store/helpers'
import { fetchProfile } from '../services/authService'
import { displayErrorMessage, isUnauthorized } from './helpers'
import { loginActions } from '.'

const authActions = {
  pending: () => createAction(AUTH.PENDING),
  success: response => createAction(AUTH.SUCCESS, { response }),
  error: error => createAction(AUTH.ERROR, { error }),
  fetchProfile() {
    return dispatch => {
      dispatch(this.pending())
      fetchProfile()
        .then(response =>
          dispatch(this.success(response))
        )
        .catch(err => {
          const message = 'Ei oikeuksia'
          dispatch(this.error({ common: message }))
          dispatch(displayErrorMessage(isUnauthorized(err), message))
          isUnauthorized(err) && dispatch(loginActions.logout('/login'))
        })
    }
  }
}

export default authActions
export const AUTH = createAsyncTypes(actionKeys.auth)
