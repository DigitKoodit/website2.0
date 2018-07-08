import mapValues from 'lodash/mapValues'

const asyncTypes = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}

export const crudTypes = {
  FETCH: 'FETCH',
  UPDATE: 'UPDATE',
  CREATE: 'CREATE',
  DELETE: 'DELETE'
}

export const createAsyncTypes = typeString =>
  Object.values(asyncTypes).reduce((acc, current) => ({
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
 * Generates PENDING and ERROR reducers for CRUD operations for passed type
 *
 * @param {String} type reducer type constant
 */
export const commonCrudReducers = type => ({
  ...combineCrudOperationReducers(type, 'PENDING', state => ({
    ...state,
    loading: true
  })),
  ...combineCrudOperationReducers(type, 'ERROR', (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  }))
})

export const combineCrudOperationReducers = (type, actionType, reducerFunc) =>
  mapValues(crudTypes, crudOperation => ({
    [type[crudOperation][actionType]]: reducerFunc
  }))
