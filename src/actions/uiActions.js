import * as types from './actionTypes'

const timeoutLong = 2900

const toggleSnackbar = message => ({
  type: types.TOGGLE_SNACKBAR,
  snackbarMessage: message
})

export const displaySnackbar = message => dispatch => {
  dispatch(toggleSnackbar(message))
  // FIXME: [Violation] 'setTimeout' handler took 50ms happens sometimes
  setTimeout(() => dispatch(toggleSnackbar(message)), timeoutLong)
}
