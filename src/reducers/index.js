import { types } from '../actions'

import ui from './uiReducer'
import auth from './authReducer'
import login from './loginReducers'
import registration from './registrationReducers'
import siteNavigation from './siteNavigationReducers'
import generateReducer from './generateReducer'

const rootReducer =
  {
    ui,
    auth,
    login,
    registration,
    siteNavigation,
    pages: generateReducer(types.SITE_PAGE),
    roles: generateReducer(types.USER_ROLE),
    sponsors: generateReducer(types.SPONSOR),
    userAccounts: generateReducer(types.USER_ACCOUNT),
    events: generateReducer(types.EVENT)
  }

export default rootReducer
