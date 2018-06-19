import { createReducer } from '../store/helpers'
import { types } from '../actions'

const initialState = {
  records: [],
  error: {},
  loading: false
}

export default createReducer(initialState, {
  [types.SITE_NAVIGATION.PENDING]: state => ({
    ...state,
    loading: true
  }),
  [types.SITE_NAVIGATION.SUCCESS]: (state, action) => ({
    ...state,
    records: action.response,
    loading: false
  }),
  [types.SITE_NAVIGATION.ERROR]: (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  })
})
