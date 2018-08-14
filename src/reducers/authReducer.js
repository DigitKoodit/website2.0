import { createReducer } from '../store/helpers'
import { types } from '../actions'

const initialState = {
  profile: {},
  isLoggedIn: false,
  loading: false
}

export default createReducer(initialState, {
  [types.AUTH.PENDING]: state => ({
    ...state,
    loading: true
  }),
  [types.AUTH.SUCCESS]: (state, action) => ({
    ...state,
    profile: action.response,
    loading: false
  }),
  [types.AUTH.ERROR]: (state, action) => ({
    ...initialState,
    error: action.error
  })
})
