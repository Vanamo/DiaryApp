const initialState = {
  message: null,
  style: null
}

const reducer = (state = initialState, action) => {
  const message = action.message
  const style = action.style
  switch (action.type) {
  case 'SUCCESS':
    return { message, style }
  case 'ERROR':
    return { message, style }
  case 'HIDE_NOTIFICATION':
    return initialState
  }
  return state
}

export const newSuccessNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SUCCESS',
      message,
      style: 'success'
    })
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, time * 1000)
  }
}

export const newErrorNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'ERROR',
      message,
      style: 'error'
    })
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, time * 1000)
  }
}

export default reducer