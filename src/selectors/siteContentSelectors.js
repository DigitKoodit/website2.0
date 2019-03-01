import createCachedSelector from 're-reselect'
import { INITIAL_ID, NEW_ITEM_URL_KEYWORD } from '../constants'

const parseId = id => id === NEW_ITEM_URL_KEYWORD ? INITIAL_ID : Number(id)
const getSitePageFromArguments = arg => arg.pages ? arg.pages.records : arg

export const findSitePageById = createCachedSelector(
  getSitePageFromArguments,
  (state, sitePageId) => parseId(sitePageId),
  (sitePages, sitePageId) => {
    return sitePages.find(sitePage => sitePage.id === sitePageId)
  }
)((state, sitePageId) => sitePageId)
