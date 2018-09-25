import reservedDayService from '../services/reservedDays'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_RESERVED_DAYS':
      if (action.data) {
        return Object.values(action.data)
      } else {
        return []
      }
    case 'NEW_RESERVED_DAY':
      return [...state, action.data]
    case 'DELETE_RESERVED_DAY': {
      const id = action.data.id
      return state.filter(n => n.id !== id)
    }
  }
  return state
}

export const initReservedDays = (userId) => {
  return async (dispatch) => {
    await reservedDayService.getReservedDays(userId, function (success, data, error) {
      if (success) {
        dispatch({
          type: 'INIT_RESERVED_DAYS',
          data
        })
      } else if (error) {
        console.log(error.message)
      }
    })
  }
}

export const newReservedDay = (reservedDayObject) => {
  return async (dispatch) => {
    await reservedDayService.create(reservedDayObject, function (success, data, error) {
      if (success) {
        dispatch({
          type: 'NEW_RESERVED_DAY',
          data
        })
      } else if (error) {
        console.log(error.message)
      }
    })
  }
}

export const deleteReservedDay = (reservedDayObject, errorCB) => {
  return async (dispatch) => {
    await reservedDayService.remove(reservedDayObject, function (success, data, error) {
      if (success) {
        dispatch({
          type: 'DELETE_RESERVED_DAY',
          data: data.id
        })
      } else if (error) {
        errorCB(error)
      }
    })
  }
}

export default reducer