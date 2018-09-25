import noteService from '../services/notes'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER_NOTES':
      if (action.data) {
        return Object.values(action.data)
      } else {
        return []
      }
    case 'NEW_NOTE':
      return [...state, action.data]
    case 'UPDATE_NOTE': {
      const changedNote = action.data
      const id = changedNote.id
      return state.map(n => n.id !== id ? n : changedNote)
    }
    case 'DELETE_NOTE': {
      const id = action.data.id
      return state.filter(n => n.id !== id)
    }
  }
  return state
}

export const initUserNotes = (userId) => {
  return async (dispatch) => {
    await noteService.getUserNotes(userId, function (success, data, error) {
      if (success) {
        dispatch({
          type: 'INIT_USER_NOTES',
          data
        })
      } else if (error) {
        console.log(error.message)
      }
    })
    dispatch({ type: 'HIDE_LOADER' })
  }
}

export const newNote = (noteObject, successCB) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_LOADER' })
    await noteService.create(noteObject, function (success, data, error) {
      if (success) {
        dispatch({
          type: 'NEW_NOTE',
          data
        })
        dispatch({
          type: 'SUCCESS',
          message: 'Muistiinpano on tallennettu',
          style: 'success'
        })
        setTimeout(() => {
          dispatch({ type: 'HIDE_NOTIFICATION' })
        }, 5000)
        successCB(data)
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

export const updateNote = (changedNote) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_LOADER' })
    await noteService.update(changedNote, function (success, data, error) {
      if (success) {
        dispatch({
          type: 'UPDATE_NOTE',
          data
        })
        dispatch({
          type: 'SUCCESS',
          message: 'Muistiinpano on tallennettu',
          style: 'success'
        })
        setTimeout(() => {
          dispatch({ type: 'HIDE_NOTIFICATION' })
        }, 5000)
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

export const deleteNote = (noteObject, errorCB) => {
  return async (dispatch) => {
    await noteService.remove(noteObject, function (success, data, error) {
      if (success) {
        dispatch({
          type: 'DELETE_NOTE',
          data: data.id
        })
      } else if (error) {
        errorCB(error)
      }
    })
  }
}

export default reducer