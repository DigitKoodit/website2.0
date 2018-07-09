import loginActions, { LOGIN } from './loginActions'
import registrationActions, { REGISTRATION } from './registrationActions'
import siteNavigationActions, { SITE_NAVIGATION } from './siteNavigationActions'
import pageContentActions, { SITE_PAGE } from './pageContentActions'
import sponsorActions, { SPONSOR } from './sponsorActions'

export {
  loginActions,
  registrationActions,
  siteNavigationActions,
  pageContentActions,
  sponsorActions
}

export const types = {
  LOGIN,
  REGISTRATION,
  SITE_NAVIGATION,
  SITE_PAGE,
  SPONSOR
}
