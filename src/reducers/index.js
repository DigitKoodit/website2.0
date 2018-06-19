
import ui from './uiReducer'
import login from './loginReducers'
import registration from './registrationReducers'
import siteNavigation from './siteNavigationReducers'

const rootReducer =
  {
    ui,
    login,
    registration,
    siteNavigation
  }

export default rootReducer
