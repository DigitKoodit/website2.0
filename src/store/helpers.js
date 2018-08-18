import mapValues from 'lodash/mapValues'

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
    loading: true
  })),
  ...combineCrudOperationReducers(reducerType, 'ERROR', (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  })),
  [reducerType.FETCH.SUCCESS]: (state, action) => ({
    ...state,
    records: [...action.response],
    loading: false
  }),
  [reducerType.CREATE.SUCCESS]: (state, action) => ({
    ...state,
    // rough way of copying updated object to records
    records: [...state.records, action.response],
    loading: false
  }),
  [reducerType.UPDATE.SUCCESS]: (state, action) => ({
    ...state,
    // rough way of copying updated object to records
    records: state.records.map(item => item.id === action.response.id ? action.response : item),
    loading: false
  }),
  [reducerType.DELETE.SUCCESS]: (state, action) => ({
    ...state,
    // rough way of copying updated object to records
    records: state.records.filter(item => item.id !== action.response.id),
    loading: false
  })
})

export const combineCrudOperationReducers = (type, actionType, reducerFunc) =>
  mapValues(crudTypes, crudOperation => ({
    [type[crudOperation][actionType]]: reducerFunc
  }))
