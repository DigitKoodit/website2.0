import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'
import rootReducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const configureStore = middlewares => {
  const store = createStore(
    combineReducers({
      ...rootReducer,
      routes: routerReducer
    }),
    composeWithDevTools(
      applyMiddleware(...middlewares)
    )
  )
  return store
}

export default configureStore
