import { db, auth } from '../config/db'

const register = (data, callback) => {
  const { email, password, username } = data
  auth.createUserWithEmailAndPassword(email, password)
    .then((resp) => createUser({ username, uid: resp.user.uid }, callback))
    .catch((error) => callback(false, null, error))
}

const createUser = (user, callback) => {
  const userRef = db.ref().child('users')

  userRef.child(user.uid).update({ ...user })
    .then(() => callback(true, user, null))
    .catch((error) => callback(false, null, { message: error }))
}

const login = (data, callback) => {
  const { email, password } = data
  auth.signInWithEmailAndPassword(email, password)
    .then((resp) => getUser(resp.user, callback))
    .catch((error) => callback(false, null, error))
}

const getUser = (user, callback) => {
  db.ref('users').child(user.uid).once('value')
    .then((snapshot) => {
      const exists = (snapshot.val() !== null)
      if (exists) {
        user = snapshot.val()
      }

      const data = { exists, user }
      callback(true, data, null)
    })
    .catch(error => callback(false, null, error))
}

const logout = (callback) => {
  auth.signOut()
    .then(() => {
      if (callback) callback(true, null, null)
    })
    .catch((error) => {
      if (callback) callback(false, null, error)
    })
}

export default { getUser, register, login, logout }