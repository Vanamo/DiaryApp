import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import authReducer from './reducers/authReducer'
import notificationReducer from './reducers/notificationReducer'
import loaderReducer from './reducers/loaderReducer'
import optionsModalReducer from './reducers/optionsModalReducer'
import noteReducer from './reducers/noteReducer'

const reducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  loading: loaderReducer,
  optionsVisible: optionsModalReducer,
  userNotes: noteReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store