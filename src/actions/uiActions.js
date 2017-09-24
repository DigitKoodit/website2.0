import * as types from './actionTypes';

const timeoutLong = 2900; // FIXME: snackbar flashes 100ms when timeout is set to 3000
// const timeoutShort = 1000;

const toggleSnackbar = message => ({
  type: types.TOGGLE_SNACKBAR,
  snackbarMessage: message
});

export const displaySnackbar = message => dispatch => {
  dispatch(toggleSnackbar(message))
  setTimeout(() => dispatch(toggleSnackbar(message)), timeoutLong);
}


