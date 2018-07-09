import { createReducer, commonCrudReducers } from '../store/helpers'
import { types } from '../actions'

const initialState = {
  records: [],
  error: {},
  loading: false
}

const reducerType = types.SPONSOR

export default createReducer(initialState, {
  ...commonCrudReducers(reducerType)
})
