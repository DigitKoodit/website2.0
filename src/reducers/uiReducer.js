import * as types from '../actions/actionTypes'

const initialState = {
  displaySnackbar: false,
  snackbarMessage: ''
}

export default function uiReducer(state = initialState, action) {
  switch(action.type) {
    case types.TOGGLE_SNACKBAR:
      return {
        ...state,
        displaySnackbar: !state.displaySnackbar,
        snackbarMessage: action.snackbarMessage
      }
    default:
      return state
  }
}
