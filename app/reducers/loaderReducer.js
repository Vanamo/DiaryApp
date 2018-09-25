const reducer = (state = false, action) => {
  switch (action.type) {
  case 'SET_LOADER':
    return true
  case 'HIDE_LOADER':
    return false
  }
  return state
}

export const setLoader = () => {
  return (dispatch) => {
    dispatch({
      type: 'SET_LOADER'
    })
  }
}

export const hideLoader = () => {
  return (dispatch) => {
    dispatch({
      type: 'HIDE_LOADER'
    })
  }
}

export default reducer