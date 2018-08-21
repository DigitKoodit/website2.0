import loginActions, { LOGIN } from './loginActions'
import registrationActions, { REGISTRATION } from './registrationActions'
import siteNavigationActions, { SITE_NAVIGATION } from './siteNavigationActions'
import pageContentActions, { SITE_PAGE } from './pageContentActions'
import sponsorActions, { SPONSOR } from './sponsorActions'
import userAccountActions, { USER_ACCOUNT } from './userAccountActions'
import userRoleActions, { USER_ROLE } from './userRoleActions'
import authActions, { AUTH } from './authActions'

export {
  loginActions,
  registrationActions,
  siteNavigationActions,
  pageContentActions,
  sponsorActions,
  userAccountActions,
  userRoleActions,
  authActions
}

export const types = {
  LOGIN,
  REGISTRATION,
  SITE_NAVIGATION,
  SITE_PAGE,
  SPONSOR,
  USER_ACCOUNT,
  USER_ROLE,
  AUTH
}
