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
    case 'SET_USER':
      return { ...state, isLoggedIn: true, user: action.data }
  }
  return state
}

export const register = (userData, successCB) => {
  return (dispatch) => {
    dispatch({ type: 'SET_LOADER' })
    authServices.register(userData, function (success, data, error) {
      if (success) {
        dispatch({
          type: 'LOGIN',
          data
        })
        successCB()
      } else if (error) {
        dispatch({
          type: 'ERROR',
          message: error.message,
          style: 'error'
        })
        setTimeout(() => {
          dispatch({ type: 'HIDE_NOTIFICATION' })
        }, 5000)  
      }
    })
    dispatch({ type: 'HIDE_LOADER' })
  }
}

export const login = (userData, successCB) => {
  return (dispatch) => {
    dispatch({ type: 'SET_LOADER' })
    authServices.login(userData, function (success, data, error) {
      if (success) {
        if (data.exists) {
          dispatch({
            type: 'LOGIN',
            data: data.user
          })
        }
        successCB()
      } else if (error) {
        dispatch({
          type: 'ERROR',
          message: 'Väärä käyttäjätunnus tai salasana',
          style: 'error'
        })
        setTimeout(() => {
          dispatch({ type: 'HIDE_NOTIFICATION' })
        }, 5000)        
      }
      dispatch({ type: 'HIDE_LOADER' })
    })
  }
}

export const setUser = (user) => {
  return (dispatch) => {
    dispatch({ type: 'SET_LOADER' })
    authServices.getUser(user, function (success, data, error) {
      if (success) {
        if (data.exists) {
          dispatch({
            type: 'SET_USER',
            data: data.user
          })
        }
      } else if (error) {
        console.log('no user')
      }
    })
  }
}

export const logout = (successCB, errorCB) => {
  return (dispatch) => {
    dispatch({ type: 'SET_LOADER' })
    authServices.logout(function (success, data, error) {
      if (success) {
        dispatch({
          type: 'LOGOUT'
        })
        successCB()
      } else if (error) {
        dispatch({
          type: 'ERROR',
          message: error.message,
          style: 'error'
        })
        setTimeout(() => {
          dispatch({ type: 'HIDE_NOTIFICATION' })
        }, 5000)        
      }
    })
    dispatch({ type: 'HIDE_LOADER' })
  }
}

export default reducer