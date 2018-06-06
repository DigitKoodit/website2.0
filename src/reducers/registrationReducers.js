import { createReducer } from '../store/helpers'
import { types } from '../actions'

const initialState = {
  error: {},
  loading: false
}

export default createReducer(initialState, {
  [types.REGISTRATION.PENDING]: state => ({
    ...state,
    loading: true
  }),
  [types.REGISTRATION.SUCCESS]: (state, action) => ({
    ...state,
    loading: false
  }),
  [types.REGISTRATION.ERROR]: (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  })
})
