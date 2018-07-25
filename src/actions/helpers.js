import { displaySnackbar } from '../actions/uiActions'

export const parseResponseError = (err, fallbackMessage) =>
  err.response
    ? err.response.json()
      .then(responseBody => {
        const { message, validationErrors = [] } = responseBody
        const errors = validationErrors.reduce((acc, error) => {
          console.error(error.param)
          acc[error.param] = error
          return acc
        }, {})
        return { common: message, ...errors }
      })
    : { common: fallbackMessage }

export const isUnauthorized = err => err.response && err.response.status === 401

export const displayErrorMessage = (isUnauthorized, snackbarMessage) => {
  let message = isUnauthorized ? 'Pääsy kielletty' : snackbarMessage
  return displaySnackbar(message)
}
