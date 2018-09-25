import { db } from '../config/db'

const create = (reservedDay, callback) => {
  const userId = reservedDay.userId
  const newDayRef = db.ref().child('user-reservedDays').push()
  const newDayKey = newDayRef.key

  const newReservedDay = { ...reservedDay, id: newDayKey }

  let updates = {}
  updates['/user-reservedDays/' + userId + '/' + newDayKey] = newReservedDay

  db.ref().update(updates)
    .then(() => callback(true, newReservedDay, null))
    .catch((error) => callback(false, null, error))
}

const getReservedDays = (userId, callback) => {
  const daysRef = db.ref('user-reservedDays/' + userId)

  daysRef.on('value', snapshot => {
    callback(true, snapshot.val(), null)
  })
}

const remove = (reservedDay, callback) => {
  const id = reservedDay.id
  const userId = reservedDay.userId

  let updates = {}
  updates['/user-reservedDays/' + userId + '/' + id] = null

  db.ref().update(updates)
    .then(() => callback(true, note, null))
    .catch((error) => callback(false, null, error))
}

export default { create, getReservedDays, remove }