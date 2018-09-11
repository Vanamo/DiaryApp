import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './reducers/authReducer'
import notificationReducer from './reducers/notificationReducer'
import loaderReducer from './reducers/loaderReducer'
import optionsModalReducer from './reducers/optionsModalReducer'

const reducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  loading: loaderReducer,
  optionsVisible: optionsModalReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store