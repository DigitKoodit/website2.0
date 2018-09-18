import { createReducer, commonCrudReducers } from '../store/helpers'

const initialState = {
  records: [],
  error: {},
  loading: false
}

export default reducerType => createReducer(initialState, {
  ...commonCrudReducers(reducerType)
})
