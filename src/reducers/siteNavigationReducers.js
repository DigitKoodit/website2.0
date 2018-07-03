import { crudTypes, createReducer } from '../store/helpers'
import { types } from '../actions'
import merge from 'lodash/merge'
import mapValues from 'lodash/mapValues'

const initialState = {
  records: [],
  error: {},
  loading: false
}

const combineCrudOperations = (type, actionType, reducerFunc) =>
  mapValues(crudTypes, crudOperation => ({
    [type[crudOperation][actionType]]: reducerFunc
  }))

export default createReducer(initialState, {
  ...combineCrudOperations(types.SITE_NAVIGATION, 'PENDING', state => ({
    ...state,
    loading: true
  })),
  ...combineCrudOperations(types.SITE_NAVIGATION, 'ERROR', (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  })),
  [types.SITE_NAVIGATION.FETCH.SUCCESS]: (state, action) => ({
    ...state,
    records: action.response,
    loading: false
  }),
  [types.SITE_NAVIGATION.UPDATE.SUCCESS]: (state, action) => ({
    ...state,
    // rough way of copying updated object to records
    records: Array.isArray(action.response) ? action.response : merge(state.records, action.response),
    loading: false
  }),
  [types.SITE_NAVIGATION.DELETE.SUCCESS]: (state, action) => ({
    ...state,
    // rough way of copying updated object to records
    records: state.filter(record => record.id !== action.id),
    loading: false
  })
})
