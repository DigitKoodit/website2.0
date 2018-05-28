import { createReducer } from '../store/helpers'
import { types } from '../actions'

const initialState = {
  user: {},
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
    loading: false
  }),
  [types.LOGIN.ERROR]: (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  })
})
