import authServices from '../services/auth'
import { AsyncStorage } from 'react-native'

const initialState = { isLoggedIn: false, user: null }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      const user = action.data
      AsyncStorage.multiSet([
        ['user', JSON.stringify(user)]
      ])

      return { ...state, isLoggedIn: true, user: user }
    case 'LOGOUT':
      const keys = ['user']
      AsyncStorage.multiRemove(keys)

      return { ...state, isLoggedIn: false, user: null }
  }
  return state
}

export const register = (userData, successCB, errorCB) => {
  return (dispatch) => {
    authServices.register(userData, function (success, data, error) {
      if (success) {
        dispatch({
          type: 'LOGIN',
          data
        })
        successCB(userData)
      } else if (error) {
        errorCB(error)
      }
    })
  }
}

export const login = (userData, successCB, errorCB) => {
  return (dispatch) => {
    authServices.login(userData, function (success, data, error) {
      if (success) {
        if (userData.exists) {
          dispatch({
            type: 'LOGIN',
            data: data.user
          })
        }
        successCB()
      } else if (error) {
        errorCB()
      }
    })
  }
}

export const logout = (successCB, errorCB) => {
  return (dispatch) => {
    authServices.logout(function (success, data, error) {
      if (success) {
        dispatch({
          type: 'LOGOUT'
        })
        successCB()
      } else if (error) errorCB(error)
    })
  }
}

export default reducer