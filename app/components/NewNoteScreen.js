import React from 'react'
import { connect } from 'react-redux'
import { newNote } from '../reducers/noteReducer'
import { newSuccessNotification, newErrorNotification } from '../reducers/notificationReducer'
import { newReservedDay } from '../reducers/reservedDaysReducer'
import { setInitialTab } from '../reducers/tabReducer'
import EditNoteView from '../components/EditNoteView'
import { CameraRoll } from 'react-native'


class NewNoteScreen extends React.Component {

  state = {
    startDate: null,
    endDate: null,
    content: [],
    showContent: false,
    textInputs: [],
    photos: [],
    choosablePhotos: null,
    modalOpen: false
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

  save = (done) => {
    if (!this.state.startDate) {
      this.props.newErrorNotification('Valitse alkupäivä', 5)
      return
    }

    const note = {
      startDate: this.state.startDate,
      endDate: this.state.endDate || this.state.startDate,
      content: this.state.content,
      textInputs: this.state.textInputs,
      photos: this.state.photos,
      userId: this.props.auth.user.uid
    }

    //Check if dates are valid and not used in another note

    const firstDate = note.startDate.split('.').reverse().join('-')
    const lastDate = note.endDate.split('.').reverse().join('-')

    if (new Date(firstDate) > new Date(lastDate)) {
      this.props.newErrorNotification('Alkupäivän on oltava ennen loppupäivää', 5)
      return
    }

    const reservedDays = this.getDates(firstDate, lastDate)

    if (this.checkDates(reservedDays)) {
      this.props.newErrorNotification('Samalle päivälle on jo muistiinpano', 5)
      return
    }

    for (let i in reservedDays) {
      const date = reservedDays[i]
      const startDate = (date === firstDate)
      const endDate = (date === lastDate)
      const reservedDay = {
        date,
        userId: this.props.auth.user.uid,
        startDate,
        endDate
      }
      this.props.newReservedDay(reservedDay)
    }

    if (done) {
      this.props.newNote(note, this.doneAfterSave)
    } else {
      this.props.newNote(note, this.notDoneAfterSave)
    }
  }

  doneAfterSave = (note) => {
    console.log('dNote', note)
    const index = this.props.userNotes.map(un => un.id).indexOf(note.id)
    console.log('up', index)

    this.props.setInitialTab(index)
    this.props.navigation.navigate('NoteView')

    this.resetState()
  }

  notDoneAfterSave = (note) => {
    console.log('ndNote', note)
    this.props.navigation.navigate('EditNote', { note })
    this.resetState()
  }

  resetState = () => {
    this.setState({
      startDate: null,
      endDate: null,
      content: [],
      showContent: false,
      textInputs: [],
      photos: [],
      choosablePhotos: null,
      modalOpen: false
    })
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
    newNote, newSuccessNotification, newErrorNotification, newReservedDay,
    setInitialTab
  }
)(NewNoteScreen)