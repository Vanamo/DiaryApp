import { db } from '../config/db'
import { storage } from '../config/db'

const create = async (note, callback) => {
  const userId = note.userId
  const newNoteRef = db.ref().child('user-notes').push()
  const newNoteKey = newNoteRef.key

  const photosWithDownloadURLs = await Promise.all(note.photos
    .map(photo => uploadImage(photo)))
  console.log('urls', photosWithDownloadURLs)

  const newNote = { ...note, id: newNoteKey, photos: photosWithDownloadURLs }

  let updates = {}
  updates['/user-notes/' + userId + '/' + newNoteKey] = newNote

  db.ref().update(updates)
    .then(() => callback(true, newNote, null))
    .catch((error) => callback(false, null, error))
}

const uploadImage = async (photo) => {
  const uri = photo.photo.node.image.uri
  const response = await fetch(uri)
  const blob = await response.blob()
  const ref = storage.ref().child(photo.id)

  const snapshot = await ref.put(blob)
  console.log('sn', snapshot)
  const downloadURL = await snapshot.ref.getDownloadURL()

  const photoWithDownloadURL = { ...photo, downloadURL }
  return photoWithDownloadURL
}

const getUserNotes = (userId, callback) => {
  const notesRef = db.ref('user-notes/' + userId)

  notesRef.on('value', snapshot => {
    callback(true, snapshot.val(), null)
  })
}

const update = async (note, callback) => {
  const id = note.id
  const userId = note.userId

  const photosWithDownloadURLs = await Promise.all(note.photos
    .map((photo) => {
      if (photo.downloadURL) {
        return photo
      } else {
        console.log('up', photo)
        return uploadImage(photo)
      }
    })
  )

  const noteWithUploadedPhotos = { ...note, photos: photosWithDownloadURLs }

  let updates = {}
  updates['/user-notes/' + userId + '/' + id] = noteWithUploadedPhotos

  db.ref().update(updates)
    .then(() => callback(true, noteWithUploadedPhotos, null))
    .catch((error) => callback(false, null, error))
}

const remove = (note, callback) => {
  const id = note.id
  const userId = note.userId

  let updates = {}
  updates['/user-notes/' + userId + '/' + id] = null

  db.ref().update(updates)
    .then(() => callback(true, note, null))
    .catch((error) => callback(false, null, error))
}

export default { create, getUserNotes, update, remove }