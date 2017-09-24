import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

import AppRoutes from './routes';
import configureStore from './store/configureStore';


const history = createHistory();
const middlewares = [routerMiddleware(history), thunk];

const store = configureStore(middlewares);

// store.dispatch(hasUserAuthenticated());

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppRoutes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
