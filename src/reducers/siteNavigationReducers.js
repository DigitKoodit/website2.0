import { createReducer, commonCrudReducers } from '../store/helpers'
import { types } from '../actions'
import toArray from 'lodash/toArray'
import sortBy from 'lodash/sortBy'
import includes from 'lodash/includes'

const initialState = {
  records: [],
  error: {},
  loading: false
}

export default createReducer(initialState, {
  ...commonCrudReducers(types.SITE_NAVIGATION),
  [types.SITE_NAVIGATION.FETCH.SUCCESS]: (state, action) => ({
    ...state,
    records: parseSubItems([...action.response]),
    loading: false
  }),
  [types.SITE_NAVIGATION.CREATE.SUCCESS]: (state, action) => ({
    ...state,
    // rough way of copying updated object to records
    records: parseSubItems([...state.records, action.response]),
    loading: false
  }),
  [types.SITE_NAVIGATION.UPDATE.SUCCESS]: (state, action) => ({
    ...state,
    // rough way of copying updated object to records
    records: parseSubItems(state.records.map(item => item.id === action.response.id ? action.response : item)),
    loading: false
  }),
  [types.SITE_NAVIGATION.DELETE.SUCCESS]: (state, action) => ({
    ...state,
    // rough way of copying updated object to records
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
