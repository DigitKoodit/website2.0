import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

import AppRoutes from './routes';
import configureStore from './store/configureStore';

import 'flexboxgrid';
import './styles/index.css';
import './styles/navbar.css';
import './styles/footer.css';

const history = createHistory();
const middlewares = [routerMiddleware(history), thunk];

const store = configureStore(middlewares);

// store.dispatch(hasUserAuthenticated());

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppRoutes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
