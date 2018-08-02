import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'

import App from './containers/App'
import configureStore from './store/configureStore'

import './styles/index.css'

const history = createHistory()
const middlewares = [routerMiddleware(history), thunk]

const store = configureStore(middlewares)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
