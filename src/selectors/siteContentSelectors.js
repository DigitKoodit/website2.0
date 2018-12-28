import createCachedSelector from 're-reselect'

const getSitePageFromArguments = arg => arg.pages ? arg.pages.records : arg

export const findSitePageById = createCachedSelector(
  getSitePageFromArguments,
  (state, sitePageId) => Number(sitePageId),
  (sitePages, sitePageId) => {
    return sitePages.find(sitePage => sitePage.id === sitePageId)
  }
)((state, sitePageId) => sitePageId)
