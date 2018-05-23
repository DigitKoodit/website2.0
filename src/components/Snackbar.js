import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

//TODO: add position parameter which lets user decide where does the snackbar pop up

const Snackbar = ({ displaySnackbar, snackbarMessage }) => (
  <div id="snackbar" className={(displaySnackbar ? 'show' : '')}>{snackbarMessage}</div>
)

Snackbar.defaultProps = {
  displaySnackbar: false,
  snackbarMessage: 'Fancy snackbar aye?'
}

Snackbar.propTypes = {
  displaySnackbar: PropTypes.bool.isRequired,
  snackbarMessage: PropTypes.string
}

const mapStateToProps = state => ({
  displaySnackbar: state.ui.displaySnackbar,
  snackbarMessage: state.ui.snackbarMessage
})

export default connect(mapStateToProps)(Snackbar);
