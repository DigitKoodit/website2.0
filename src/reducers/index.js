import { types } from '../actions'

import ui from './uiReducer'
import auth from './authReducer'
import login from './loginReducers'
import registration from './registrationReducers'
import siteNavigation from './siteNavigationReducers'
import generateReducer from './generateReducer'

const rootReducer = connectedRouter => (
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
    events: generateReducer(types.EVENT),
    eventEnrolls: generateReducer(types.EVENT_ENROLL),
    files: generateReducer(types.FILE),
    fileUploads: generateReducer(types.FILE_UPLOAD),
    router: connectedRouter
  }
)
export default rootReducer
