import React from 'react'
import { connect } from 'react-redux'
import { updateNote } from '../reducers/noteReducer'
import { newErrorNotification, newSuccessNotification } from '../reducers/notificationReducer'
import EditNoteView from '../components/EditNoteView'

class EditNoteScreen extends React.Component {

  state = {
    startDate: null,
    endDate: null,
    content: [],
    showContent: false,
    textInputs: []
  }

  componentDidMount() {
    const note = this.props.navigation.state.params.note
    if (note) {
      this.setState({
        startDate: note.startDate,
        endDate: note.endDate,
        content: note.content,
        showContent: true,
        textInputs: note.textInputs
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
    const note = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      content: this.state.content,
      textInputs: this.state.textInputs,
      userId: this.props.auth.user.uid,
      id: this.props.navigation.state.params.note.id
    }

    await this.props.updateNote(note)
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
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { updateNote, newErrorNotification, newSuccessNotification }
)(EditNoteScreen)