import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '../components/Snackbar';
import Main from '../containers/Main'

const App = () => (
  <div className="app-container">
    <Main />
    <Snackbar />
  </div>
)

export default App;

