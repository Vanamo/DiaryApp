const reducer = (state = 0, action) => {
  switch (action.type) {
  case 'SET_INITIAL_TAB':
    return action.data
  }
  return state
}

export const setInitialTab = (data) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_INITIAL_TAB',
      data
    })
  }
}

export default reducer