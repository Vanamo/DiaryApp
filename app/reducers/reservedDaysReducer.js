import reservedDayService from '../services/reservedDays'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_RESERVED_DAYS':
      if (action.data) {
        return Object.values(action.data)
      } else {
        return []
      }
    case 'DELETE_RESERVED_DAY': {
      const id = action.data.id
      return state.filter(n => n.id !== id)
    }
  }
  return state
}

export const initReservedDays = (userId) => {
  return (dispatch) => {
    reservedDayService.getReservedDays(userId, function (success, data, error) {
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
  return (dispatch) => {
    reservedDayService.create(reservedDayObject, function (success, data, error) {
      if (success) {
        console.log('newReservedDay', data)
      } else if (error) {
        console.log(error.message)
      }
    })
  }
}

export const deleteReservedDay = (reservedDayObject) => {
  return (dispatch) => {
    reservedDayService.remove(reservedDayObject, function (success, data, error) {
      if (success) {
        console.log('reserved day removed', data.id)
      } else if (error) {
        console.log(error.message)
      }
    })
  }
}

export default reducer