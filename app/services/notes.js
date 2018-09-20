import { db } from '../config/db'

const create = (note, callback) => {
  const userId = note.userId
  const newNoteRef = db.ref().child('notes').push()
  const newNoteKey = newNoteRef.key

  const newNote = { ...note, id: newNoteKey }

  let updates = {}
  updates['/notes/' + newNoteKey] = newNote
  updates['/user-notes/' + userId + '/' + newNoteKey] = newNote

  db.ref().update(updates)
    .then(() => callback(true, newNote, null))
    .catch((error) => callback(false, null, error))
}

const getAll = (callback) => {
  const notesRef = db.ref('notes')

  notesRef.on('value', snapshot => {
    callback(true, snapshot.val(), null)
  })
}

const update = (note, callback) => {
  const id = note.id
  const userId = note.userId

  let updates = {}
  updates['/notes/' + id] = note
  updates['/user-notes/' + userId + '/' + id] = note

  db.ref().update(updates)
    .then(() => callback(true, note, null))
    .catch((error) => callback(false, null, error))
}

const remove = (note, callback) => {
  const id = note.id
  const userId = note.userId

  let updates = {}
  updates['notes/' + id] = null
  updates['/user-notes/' + userId + '/' + id] = null

  db.ref().update(updates)
    .then(() => callback(true, note, null))
    .catch((error) => callback(false, null, error))
}

export default { create, getAll, update, remove }