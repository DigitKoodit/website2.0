import createCachedSelector from 're-reselect'

import { parseId } from '../store/helpers'
const getSitePageFromArguments = arg => arg.pages ? arg.pages.records : arg

export const findSitePageById = createCachedSelector(
  getSitePageFromArguments,
  (state, sitePageId) => parseId(sitePageId),
  (sitePages, sitePageId) => {
    return sitePages.find(sitePage => sitePage.id === sitePageId)
  }
)((state, sitePageId) => sitePageId)
