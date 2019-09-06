import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import moment from 'moment'
import 'moment/locale/fi'
import App from './containers/App'
import configureStore, { history } from './store'
import * as serviceWorker from './serviceWorker'

import './styles/index.scss'
moment.locale('fi')

const store = configureStore(history)

console.log('vujut')

const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  )

render(App)

serviceWorker.unregister()

if(process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default
    render(NextApp)
  })
}
