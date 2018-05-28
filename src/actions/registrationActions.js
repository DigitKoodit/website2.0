import { actionKeys } from './actionTypes'
import { createAsyncTypes, createAction } from '../store/helpers'

const REGISTATION = createAsyncTypes(actionKeys.registration)

export default REGISTATION

export const registrationActions = {
  pending: () => createAction(REGISTATION.PENDING),
  success: response => createAction(REGISTATION.SUCCESS, { response }),
  error: error => createAction(REGISTATION.ERROR, { error }),
  startRegistration: function(username, email, password) {
    return dispatch => {
      dispatch(this.pending())
      if(!username || !email || !password) {
        return dispatch(this.error({ username: 'Kaikki kentät vaaditaan' }))
      }
      setTimeout(() => {
        dispatch(this.success({ token: '10100101' }))
      }, 1000)
    }
  }
}
