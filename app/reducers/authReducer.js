import authServices from '../services/auth'
import { AsyncStorage } from 'react-native'

const initialState = { isLoggedIn: false, user: null }

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SIGN_UP':
        const user = action.data
        AsyncStorage.multiSet([
            ['user', JSON.stringify(user)]
        ])

        return { ...state, isLoggedIn: true, user: user }
    }
    return state
}

export const register = (data) => {
    return async (dispatch) => {
        try {
            const user = authServices.register(data)
            dispatch({
                type: 'SIGN_UP',
                data: user
            })
        } catch (exception) {
            console.log('Väärä sähköpostiosoite tai salasana')
        }
    }
}

export default reducer