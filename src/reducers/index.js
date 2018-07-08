
import ui from './uiReducer'
import login from './loginReducers'
import registration from './registrationReducers'
import siteNavigation from './siteNavigationReducers'
import pages from './pageContentReducers'

const rootReducer =
  {
    ui,
    login,
    registration,
    siteNavigation,
    pages
  }

export default rootReducer
