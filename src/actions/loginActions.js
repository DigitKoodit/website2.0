import { actionKeys } from './actionTypes'
import { createAsyncTypes, createAction } from '../store/helpers'

const LOGIN = createAsyncTypes(actionKeys.login)

export default LOGIN

export const loginActions = {
  pending: () => createAction(LOGIN.PENDING),
  success: response => createAction(LOGIN.SUCCESS, { response }),
  error: error => createAction(LOGIN.ERROR, { error }),
  startLogin: function(username, password) {
    return dispatch => {
      dispatch(this.pending())
      // setTimeout(() => dispatch(this.success({ token: '10100101' }), 1000))
      setTimeout(() => {
        dispatch(this.error({ username: 'Käyttäjänimi vaaditaan' }))
      }, 1000)
    }
  }
}
