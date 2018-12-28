import createCachedSelector from 're-reselect'
import orderBy from 'lodash/orderBy'
import sortBy from 'lodash/sortBy'

export const getArraySortedBy = createCachedSelector(
  (state, { path }) => state[path].records ? state[path].records : state[path],
  (state, options) => options,
  (entities, { sortByKey, sortOrder }) => sortBy(entities, sortByKey, sortOrder)
)((state, { path, sortByKey, sortOrder }) => `${path}${sortByKey}${sortOrder}`)

export const getArrayOrderedBy = createCachedSelector(
  (state, { path }) => state[path].records ? state[path].records : state[path],
  (state, options) => options,
  (entities, { sortByKeys, orders }) => {
    const a = orderBy(entities, sortByKeys, orders)
    return a
  }
)((state, { path, sortByKeys = [], orders = [] }) => {
  const sortByCacheKey = sortByKeys.reduce((acc, { sortBy, sortOrder }) => `${sortBy}${sortOrder}`, '')
  const ordersCacheKey = orders.reduce((acc, { sortBy, sortOrder }) => `${sortBy}${sortOrder}`, '')
  return `${path}${sortByCacheKey}${ordersCacheKey}`
})
