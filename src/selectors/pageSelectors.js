import { createSelector } from 'reselect'

export const getPagesFromArgument = arg => arg.pages ? arg.pages.records : arg

export const findPublicPages = createSelector(
  getPagesFromArgument,
  pages => pages.filter(({ isHidden }) => !isHidden)
)
