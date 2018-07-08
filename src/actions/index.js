import loginActions, { LOGIN } from './loginActions'
import registrationActions, { REGISTRATION } from './registrationActions'
import siteNavigationActions, { SITE_NAVIGATION } from './siteNavigationActions'
import pageContentActions, { SITE_PAGE } from './pageContentActions'

export {
  loginActions,
  registrationActions,
  siteNavigationActions,
  pageContentActions
}

export const types = {
  LOGIN,
  REGISTRATION,
  SITE_NAVIGATION,
  SITE_PAGE
}
