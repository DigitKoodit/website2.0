import { LOCATION_CHANGE } from 'react-router-redux'

// UI
export const TOGGLE_SNACKBAR = 'TOGGLE_SNACKBAR'

// Location and History api
export const APP_LOCATION_CHANGE = LOCATION_CHANGE

// Site content
export const LOAD_NAVIGATION_REQUEST = 'LOAD_NAVIGATION_REQUEST'
export const LOAD_NAVIGATION_SUCCESS = 'LOAD_NAVIGATION_SUCCESS'
export const LOAD_NAVIGATION_FAIL = 'LOAD_NAVIGATION_FAIL'

export const actionKeys = {
  login: 'LOGIN',
  registration: 'REGISTRATION',
  sitePage: 'SITE_PAGE',
  siteNavigation: 'SITE_NAVIGATION'
}
