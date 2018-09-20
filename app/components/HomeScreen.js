import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { initUserNotes } from '../reducers/noteReducer'
import Notification from './Notification'
import { CalendarList } from 'react-native-calendars'

class HomeScreen extends React.Component {

  state = {
    currentUser: null
  }

  componentDidMount() {
    const currentUser = this.props.auth.user
    this.setState({ currentUser })
  }

  componentDidUpdate(prevProps) {
    const currentUser = this.props.auth.user
    if (currentUser !== prevProps.auth.user) {
      this.setState({ currentUser })
      console.log('user', currentUser)
      this.props.initUserNotes(currentUser.uid)
    }
  }

  formulateDate = (note) => {
    console.log('n', note)
    const startDateString = '\'' + note.startDate + '\': {startingDay: true, color:\'gray\'}, '
    const endDateString = '\'' + note.endDate + '\': {endingDay: true, color:\'gray\'}, '

    const dateString = startDateString + endDateString
    console.log('s', dateString)
    return dateString
  }

  render() {
    const userNotes = this.props.userNotes
    console.log('notes', userNotes)
    if (userNotes) {
      this.formulateDate(userNotes[1])
      //const markedDates = notes.map(n => this.formulateDate(n))
      //console.log('md', markedDates)
    }

    return (
      <View style={styles.container}>
        <View style={{ height: 100 }}>
          <Notification />
        </View>
        <CalendarList
          horizontal={true}
          pagingEnabled={true}
          maxDate={new Date()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    userNotes: state.userNotes
  }
}

export default connect(
  mapStateToProps,
  { initUserNotes }
)(HomeScreen)