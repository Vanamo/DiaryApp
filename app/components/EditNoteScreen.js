import React from 'react'
import { connect } from 'react-redux'
import { updateNote } from '../reducers/noteReducer'
import { newErrorNotification, newSuccessNotification } from '../reducers/notificationReducer'
import { newReservedDay, deleteReservedDay } from '../reducers/reservedDaysReducer'
import EditNoteView from '../components/EditNoteView'

class EditNoteScreen extends React.Component {

  state = {
    startDate: null,
    endDate: null,
    content: [],
    showContent: false,
    textInputs: [],
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
        textInputs: note.textInputs,
        prevStartDate: note.startDate,
        prevEndDate: note.endDate
      })
    }
  }

  addTextInput = () => {
    const content = this.state.content
    const id = Math.random().toString(36).substr(2, 16)
    content.push({ type: 'text', id })
    const textInputs = this.state.textInputs
    textInputs.push({ id, text: '' })
    this.setState({
      content,
      textInputs,
      showContent: true
    })
  }

  addPicture = () => {

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

  removeTextInput = (id) => {
    if (!this.state.textInputs.find(t => t.id === id).text.length) {
      const content = this.state.content.filter(c => c.id !== id)
      const textInputs = this.state.textInputs.filter(t => t.id !== id)
      let showContent = true
      if (!content.length) {
        showContent = false
      }
      this.setState({
        content,
        textInputs,
        showContent
      })
    }
  }

  save = async () => {
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
      userId: this.props.auth.user.uid
    }

    const oldStartDate = this.state.prevStartDate
    const oldEndDate = this.state.prevEndDate

    if (oldStartDate === note.startDate && oldEndDate === note.endDate) {
      await this.props.updateNote(note)
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
        onStartDateChange={this.onStartDateChange}
        onEndDateChange={this.onEndDateChange}
        resetDates={this.resetDates}
        changeTextInput={this.changeTextInput}
        removeTextInput={this.removeTextInput}
        addTextInput={this.addTextInput}
        addPicture={this.addPicture}
        save={this.save}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    reservedDays: state.reservedDays
  }
}

export default connect(
  mapStateToProps,
  { updateNote, newErrorNotification, newSuccessNotification,
    newReservedDay, deleteReservedDay }
)(EditNoteScreen)