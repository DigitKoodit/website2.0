import { createReducer, commonCrudReducers } from '../store/crudHelpers'
import { types } from '../actions'
import toArray from 'lodash/toArray'
import sortBy from 'lodash/sortBy'
import includes from 'lodash/includes'

const initialState = {
  records: [],
  error: {},
  loading: false
}

const reducerType = types.SITE_NAVIGATION

export default createReducer(initialState, {
  ...commonCrudReducers(reducerType),
  [reducerType.FETCH.SUCCESS]: (state, action) => ({
    ...state,
    records: parseSubItems([...action.response]),
    loading: false
  }),
  [reducerType.CREATE.SUCCESS]: (state, action) => ({
    ...state,
    records: parseSubItems([...state.records, action.response]),
    loading: false
  }),
  [reducerType.UPDATE.SUCCESS]: (state, action) => ({
    ...state,
    records: parseSubItems(state.records.map(item => item.id === action.response.id ? action.response : item)),
    loading: false
  }),
  [reducerType.DELETE.SUCCESS]: (state, action) => ({
    ...state,
    records: state.records.filter(item => item.id !== action.response.id),
    loading: false
  })
})

const parseSubItems = navItems => {
  const navigation = [...navItems]
    .reduce((acc, item) => ({
      ...acc,
      [item.id]: { ...item, subItems: [] }
    }), {})
  const hasParent = sortBy(navItems.filter(item => item.parentId), ['weight'])
  hasParent.forEach(item => {
    const parent = navigation[item.parentId]
    if(parent && !includes(parent.subItems, item.id)) {
      navigation[item.parentId] = { ...parent, subItems: [...parent.subItems || [], item.id] }
    }
  })
  return sortBy(toArray(navigation), ['weight'])
}
