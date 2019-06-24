import { createStore, combineReducers, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const history = createBrowserHistory()

const configureStore = history => {
  const middlewares = [thunk, routerMiddleware(history)]
  const store = createStore(
    combineReducers(
      rootReducer(connectRouter(history))
    ),
    composeWithDevTools(
      applyMiddleware(...middlewares)
    ))
  if(process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer(connectRouter(history)))
    })
  }
  return store
}

export default configureStore
export { history }
