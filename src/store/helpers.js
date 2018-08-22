import reduce from 'lodash/reduce'

const actionTypes = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  RESET: 'RESET'
}

export const crudTypes = {
  FETCH: 'FETCH',
  UPDATE: 'UPDATE',
  CREATE: 'CREATE',
  DELETE: 'DELETE'
}

export const createAsyncTypes = typeString =>
  Object.values(actionTypes).reduce((acc, current) => ({
    ...acc,
    [current]: `${typeString}_${current}`
  }), {})

export const createCrudTypes = typeString =>
  Object.values(crudTypes).reduce((acc, current) => ({
    ...acc,
    [current]: createAsyncTypes(`${typeString}_${current}`)
  }), {})

export const createAction = (type, payload = {}) =>
  ({ type, ...payload })

export const createReducer = (initialState, handlers) =>
  (state = initialState, action) =>
    handlers.hasOwnProperty(action.type)
      ? handlers[action.type](state, action)
      : state

export const arrayToObject = array => array.reduce((acc, item) => ({ ...acc, [item.id]: item }))

export const deleteItem = (object, key) => {
  const filtered = { ...object }
  delete filtered[key]
  return filtered
}

/**
 * Generates reducers for crud operations. Just override function in reducer if custom operations are needed. E.g: * {..., [reducerType.CREATE.SUCCESS]: (state, action) {...},...} Se siteNavigationReducers.js
 *
 * @param {String} type reducer type constant
 */
export const commonCrudReducers = reducerType => ({
  ...combineCrudOperationReducers(reducerType, 'PENDING', state => ({
    ...state,
    loading: true,
    error: {}
  })),
  ...combineCrudOperationReducers(reducerType, 'ERROR', (state, action) => {
    return ({
      ...state,
      error: action.error,
      loading: false
    })
  }),
  [reducerType.FETCH.SUCCESS]: (state, action) => ({
    ...state,
    records: Array.isArray(action.response) ? [...action.response] : [...state.records, action.response],
    loading: false,
    error: {}
  }),
  [reducerType.CREATE.SUCCESS]: (state, action) => ({
    ...state,
    // rough way of copying updated object to records
    records: [...state.records, action.response],
    loading: false,
    error: {}
  }),
  [reducerType.UPDATE.SUCCESS]: (state, action) => ({
    ...state,
    // rough way of copying updated object to records
    records: state.records.map(item => item.id === action.response.id ? action.response : item),
    loading: false,
    error: {}
  }),
  [reducerType.DELETE.SUCCESS]: (state, action) => ({
    ...state,
    // rough way of copying updated object to records
    records: state.records.filter(item => item.id !== action.response.id),
    loading: false,
    error: {}
  })
})

export const combineCrudOperationReducers = (type, actionType, reducerFunc) =>
  reduce(crudTypes, (crudReducers, crudOperation) => ({
    ...crudReducers,
    [type[crudOperation][actionType]]: reducerFunc
  }), {})
