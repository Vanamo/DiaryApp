import firebase from 'firebase'

const register = (data, callback) => {
  const { email, password, username } = data
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((resp) => createUser({ username, uid: resp.user.uid }, callback))
    .catch((error) => callback(false, null, error))
}

const createUser = (user, callback) => {
  console.log('u', user)
  firebase.database().ref('users').push({
    username: user.username,
    uid: user.uid
  }).then(() => callback(true, user, null))
    .catch((error) => callback(false, null, { message: error }))
}

const login = (data, callback) => {
  const { email, password } = data
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((resp) => getUser(resp.user, callback))
    .catch((error) => callback(false, null, error))
}

const getUser = (user, callback) => {
  firebase.database().ref('users').child(user.uid).once('value')
    .then(function (snapshot) {
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
  firebase.auth().signOut()
    .then(() => {
      if (callback) callback(true, null, null)
    })
    .catch((error) => {
      if (callback) callback(false, null, error)
    })
}

export default { register, login, logout }