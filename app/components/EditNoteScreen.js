import React from 'react'
import { connect } from 'react-redux'
import { updateNote } from '../reducers/noteReducer'
import { newErrorNotification, newSuccessNotification } from '../reducers/notificationReducer'
import { newReservedDay, deleteReservedDay } from '../reducers/reservedDaysReducer'
import { setInitialTab } from '../reducers/tabReducer'
import EditNoteView from '../components/EditNoteView'
import { CameraRoll } from 'react-native'

class EditNoteScreen extends React.Component {

  state = {
    startDate: null,
    endDate: null,
    content: [],
    showContent: false,
    textInputs: [],
    photos: [],
    choosablePhotos: null,
    modalOpen: false,
    prevStartDate: null,
    prevEndDate: null
  }

  componentDidMount() {
    const note = this.props.navigation.state.params.note
    if (note) {
      this.setState({
        startDate: note.startDate,
        endDate: note.endDate,
        content: note.content,
        showContent: true,
        prevStartDate: note.startDate,
        prevEndDate: note.endDate
      })
      if (note.textInputs) {
        this.setState({
          textInputs: note.textInputs
        })
      }
      if (note.photos) {
        this.setState({
          photos: note.photos
        })
      }
    }
  }

  getId = () => {
    return Math.random().toString(36).substr(2, 16)
  }

  addTextInput = () => {
    const content = this.state.content
    const id = this.getId()
    content.push({ type: 'text', id })
    const textInputs = this.state.textInputs
    textInputs.push({ id, text: '' })
    this.setState({
      content,
      textInputs,
      showContent: true
    })
  }

  addPicture = async () => {
    const cameraRoll = await CameraRoll.getPhotos({
      first: 50
    })
    this.setState({
      choosablePhotos: cameraRoll.edges,
      modalOpen: true
    })
  }

  hideModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  onPressPhoto = (photo) => {
    this.hideModal()
    console.log('photo', photo)
    const id = this.getId()
    const content = this.state.content
    content.push({ type: 'picture', id })
    const photos = this.state.photos
    photos.push({ id, photo })
    this.setState({
      content,
      photos,
      showContent: true
    })
  }

  resetDates = () => {
    this.setState({
      startDate: null,
      endDate: null
    })
  }

  changeTextInput = (text, id) => {
    const textInputs = this.state.textInputs.map(t => t.id !== id ? t : { ...t, text })
    this.setState({ textInputs })
  }

  removeInput = (id, group) => {
    //If there is text in textInput do not remove it
    if (group === 'textInputs' && this.state.textInputs.find(t => t.id === id).text.length) {
      return
    }

    const content = this.state.content.filter(c => c.id !== id)
    const inputs = this.state[group].filter(i => i.id !== id)
    let showContent = true
    if (!content.length) {
      showContent = false
    }
    this.setState({
      content,
      [group]: inputs,
      showContent
    })
  }

  save = async (done) => {
    if (!this.state.startDate) {
      this.props.newErrorNotification('Valitse alkupäivä', 5)
      return
    }

    const note = {
      id: this.props.navigation.state.params.note.id,
      startDate: this.state.startDate,
      endDate: this.state.endDate || this.state.startDate,
      content: this.state.content,
      textInputs: this.state.textInputs,
      photos: this.state.photos,
      userId: this.props.auth.user.uid
    }

    const oldStartDate = this.state.prevStartDate
    const oldEndDate = this.state.prevEndDate

    if (oldStartDate === note.startDate && oldEndDate === note.endDate) {
      await this.props.updateNote(note)
      this.moveAfterDone(note, done)
      return
    }

    //Check if dates are valid and not used in another note
    const firstDate = note.startDate.split('.').reverse().join('-')
    const lastDate = note.endDate.split('.').reverse().join('-')

    if (new Date(firstDate) > new Date(lastDate)) {
      this.props.newErrorNotification('Alkupäivän on oltava ennen loppupäivää', 5)
      return
    }

    const oldFirstDate = oldStartDate.split('.').reverse().join('-')
    const oldLastDate = oldEndDate.split('.').reverse().join('-')

    const oldDays = this.getDates(oldFirstDate, oldLastDate)
    const newDays = this.getDates(firstDate, lastDate)
    const reservedDays = newDays.filter((element) => {
      return oldDays.indexOf(element) === -1
    })
    console.log('resd', reservedDays)

    if (this.checkDates(reservedDays)) {
      this.props.newErrorNotification('Samalle päivälle on jo muistiinpano', 5)
      return
    }

    for (let i in newDays) {
      const date = newDays[i]
      const startDate = (date === firstDate)
      const endDate = (date === lastDate)
      const reservedDay = {
        date,
        userId: this.props.auth.user.uid,
        startDate,
        endDate
      }
      await this.props.newReservedDay(reservedDay)
    }

    for (let i in oldDays) {
      const date = oldDays[i]
      const reservedDate = this.props.reservedDays.find(rd => rd.date === date)
      await this.props.deleteReservedDay(reservedDate)
    }

    await this.props.updateNote(note)

    this.setState({
      prevStartDate: note.startDate,
      prevEndDate: note.endDate
    })

    this.moveAfterDone(note, true)
  }

  moveAfterDone = async (note, done) => {
    if (done) {
      const updatedNote = this.props.userNotes.find(un => un.startDate === note.startDate)
      const index = this.props.userNotes.indexOf(updatedNote)
      console.log('up', updatedNote, index)

      await this.props.setInitialTab(index)
      this.props.navigation.navigate('NoteView')
    }
  }

  checkDates = (dateArray) => {
    for (let i in dateArray) {
      const reservedDate = this.props.reservedDays.find(rd =>
        rd.date === dateArray[i])
      if (reservedDate) return true
    }
    return false
  }

  getDates = (startDate, endDate) => {
    const dateArray = new Array()
    let currentDate = new Date(startDate)
    const stopDate = new Date(endDate)
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate).toISOString().slice(0, 10))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return dateArray
  }

  onStartDateChange = (date) => {
    this.setState({ startDate: date })
  }

  onEndDateChange = (date) => {
    this.setState({ endDate: date })
  }

  render() {
    return (
      <EditNoteView
        showContent={this.state.showContent}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        content={this.state.content}
        textInputs={this.state.textInputs}
        photos={this.state.photos}
        choosablePhotos={this.state.choosablePhotos}
        modalOpen={this.state.modalOpen}
        onStartDateChange={this.onStartDateChange}
        onEndDateChange={this.onEndDateChange}
        resetDates={this.resetDates}
        changeTextInput={this.changeTextInput}
        removeInput={this.removeInput}
        addTextInput={this.addTextInput}
        addPicture={this.addPicture}
        save={this.save}
        onPressPhoto={this.onPressPhoto}
      />
    )
  }
}

const sortByStartDate = (a, b) => {
  const d1 = new Date(a.startDate.split('.').reverse().join('-'))
  const d2 = new Date(b.startDate.split('.').reverse().join('-'))
  if (d1 < d2) {
    return -1
  } else if (d1 > d2) {
    return 1
  } else {
    return 0
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    reservedDays: state.reservedDays,
    userNotes: state.userNotes.sort(sortByStartDate)
  }
}

export default connect(
  mapStateToProps,
  {
    updateNote, newErrorNotification, newSuccessNotification,
    newReservedDay, deleteReservedDay, setInitialTab
  }
)(EditNoteScreen)