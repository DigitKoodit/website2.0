import createCachedSelector from 're-reselect'

const getSitePageFromArguments = arg => arg.pages ? arg.pages.records : arg
const getSiteNavigationFromArguments = arg => arg.siteNavigation ? arg.siteNavigation.records : arg

export const findSiteNavigationByPath = createCachedSelector(
  getSiteNavigationFromArguments,
  (state, path) => path,
  (siteNavigations, path) => {
    return siteNavigations.find(siteNavigation => siteNavigation.path === path)
  }
)((state, path) => path)

export const findSitePageById = createCachedSelector(
  getSitePageFromArguments,
  (state, sitePageId) => Number(sitePageId),
  (sitePages, sitePageId) => {
    return sitePages.find(sitePage => sitePage.id === sitePageId)
  }
)((state, sitePageId) => sitePageId)
