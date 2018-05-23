import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '../components/Snackbar';

const App = ({ children }) => (
  <div className="app-container">
    {children}
    <Snackbar />
  </div>
)

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default App;

