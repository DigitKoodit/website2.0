import createCachedSelector from 're-reselect'
import { INITIAL_ID, NEW_ITEM_URL_KEYWORD } from '../constants'

const parseId = id => id === NEW_ITEM_URL_KEYWORD ? INITIAL_ID : Number(id)
const getSitePageFromArguments = arg => arg.sponsors ? arg.sponsors.records : arg

export const findSponsorById = createCachedSelector(
  getSitePageFromArguments,
  (state, sponsorId) => parseId(sponsorId),
  (sponsors, sponsorId) => {
    return sponsors.find(sitePage => sitePage.id === sponsorId)
  }
)((state, sponsorId) => sponsorId)
