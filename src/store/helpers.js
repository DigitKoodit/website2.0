
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
