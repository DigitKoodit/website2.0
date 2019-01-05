import { createStore, combineReducers, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import rootReducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const configureStore = history => {
  const middlewares = [thunk, routerMiddleware(history)]
  const store = createStore(
    connectRouter(history)(combineReducers(rootReducer)),
    composeWithDevTools(
      applyMiddleware(...middlewares)
    ))
  if(process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer)
    })
  }
  return store
}

export default configureStore
