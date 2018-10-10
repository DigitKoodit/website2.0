import { createReducer, commonCrudReducers } from '../store/crudHelpers'

const initialState = {
  records: [],
  error: {},
  loading: false
}

export default reducerType => createReducer(initialState, {
  ...commonCrudReducers(reducerType)
})
