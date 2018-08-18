import { createReducer } from '../store/helpers'
import { types } from '../actions'

const initialState = {
  error: {},
  loading: false
}

export default createReducer(initialState, {
  [types.LOGIN.PENDING]: state => ({
    ...state,
    loading: true
  }),
  [types.LOGIN.SUCCESS]: (state, action) => ({
    ...state,
    user: action.response,
    loading: false,
    error: {}
  }),
  [types.LOGIN.ERROR]: (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  }),
  [types.LOGIN.RESET]: () => initialState
})
