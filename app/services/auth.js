import { auth, database } from '../config/firebase'

const register = async (data) => {
    const { email, password, username } = data

    try {
        const response = await auth.createUserWithEmailAndPassword(email, password)
        return response.data
    } catch (error) {
        console.log(error.toString())
    }
}

export default { register }