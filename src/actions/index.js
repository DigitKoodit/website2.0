import loginActions, { LOGIN } from './loginActions'
import registrationActions, { REGISTRATION } from './registrationActions'
import siteNavigationActions, { SITE_NAVIGATION } from './siteNavigationActions'
import siteContentActions, { SITE_PAGE } from './pageContentActions'

export {
  loginActions,
  registrationActions,
  siteNavigationActions,
  siteContentActions
}

export const types = {
  LOGIN,
  REGISTRATION,
  SITE_NAVIGATION,
  SITE_PAGE
}
