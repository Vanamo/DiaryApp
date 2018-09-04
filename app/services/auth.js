import firebase from 'firebase'

const register = async (data) => {
  const { email, password } = data

  const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
  return response.data
}

export default { register }