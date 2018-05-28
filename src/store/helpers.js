
const asyncTypes = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}

export const createAsyncTypes = typeString =>
  Object.values(asyncTypes).reduce((acc, current) => {
    acc[current] = `${typeString}_${current}`
    return acc
  }, {})

export const createAction = (type, payload = {}) =>
  ({ type, ...payload })

export const createReducer = (initialState, handlers) =>
  (state = initialState, action) =>
    handlers.hasOwnProperty(action.type)
      ? handlers[action.type](state, action)
      : state
