import createCachedSelector from 're-reselect'

import { parseId } from '../store/helpers'
const getSitePageFromArguments = arg => arg.sponsors ? arg.sponsors.records : arg

export const findSponsorById = createCachedSelector(
  getSitePageFromArguments,
  (state, sponsorId) => parseId(sponsorId),
  (sponsors, sponsorId) => {
    return sponsors.find(sitePage => sitePage.id === sponsorId)
  }
)((state, sponsorId) => sponsorId)
