
import ui from './uiReducer'
import login from './loginReducers'
import registration from './registrationReducers'
import siteNavigation from './siteNavigationReducers'
import pages from './pageContentReducers'
import sponsors from './sponsorReducers'

const rootReducer =
  {
    ui,
    login,
    registration,
    siteNavigation,
    pages,
    sponsors
  }

export default rootReducer
