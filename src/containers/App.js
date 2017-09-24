import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '../components/Snackbar';

import 'flexboxgrid';
import '../public/styles/main.scss';
import '../public/styles/navbar.scss';
import '../public/styles/footer.scss';


const App = ({ children }) => (
  <div className="app-container">
    {children}
    <Snackbar />
  </div>
)

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default App;

