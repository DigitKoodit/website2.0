import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux'
import rootReducer from '../reducers'

const configureStore = middlewares => {
  const store = createStore(
    combineReducers({
      ...rootReducer,
      routes: routerReducer
    }),
    applyMiddleware(...middlewares)
  )
  return store
}

export default configureStore
