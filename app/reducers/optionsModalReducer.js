const reducer = (state = false, action) => {
  switch (action.type) {
  case 'SHOW_OPTIONS':
    return true
  case 'HIDE_OPTIONS':
    return false
  }
  return state
}

export const showOptions = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_OPTIONS'
    })
  }
}

export const hideOptions = () => {
  return async (dispatch) => {
    dispatch({
      type: 'HIDE_OPTIONS'
    })
  }
}

export default reducer