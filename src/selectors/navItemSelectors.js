import createCachedSelector from 're-reselect'

const getNavItemFromArguments = arg => arg.siteNavigation ? arg.siteNavigation.records : arg

export const findNavItemByPath = createCachedSelector(
  getNavItemFromArguments,
  (state, path) => path,
  (navItems, path) => navItems.find(navItem => navItem.path === path)
)((state, path) => path)

export const findNavItemById = createCachedSelector(
  getNavItemFromArguments,
  (state, navItemId) => Number(navItemId),
  (navItems, navItemId) => {
    return navItems.find(navItem => navItem.id === navItemId)
  }
)((state, navItemId) => navItemId)
