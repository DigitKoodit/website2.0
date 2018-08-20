import { createReducer } from '../store/helpers'
import { types } from '../actions'

const initialState = {
  record: {},
  error: {},
  isLoggedIn: false,
  loading: true
}

export default createReducer(initialState, {
  [types.AUTH.PENDING]: state => ({
    ...state,
    loading: true
  }),
  [types.AUTH.SUCCESS]: (state, action) => ({
    ...state,
    record: action.response,
    isLoggedIn: true,
    loading: false,
    error: {}
  }),
  [types.AUTH.ERROR]: (state, action) => ({
    ...initialState,
    error: action.error
  }),
  [types.AUTH.RESET]: () => initialState
})
