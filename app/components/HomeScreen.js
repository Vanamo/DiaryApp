import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { initNotes } from '../reducers/noteReducer'
import Notification from './Notification'
import { CalendarList } from 'react-native-calendars'

class HomeScreen extends React.Component {

  componentDidMount() {
    this.props.initNotes()
  }

  formulateDate = (note) => {
    console.log('n', note)
    let startDateString = null
    let endDateString = null
    if (note.startDate) {
      startDateString = '\'' + note.startDate + '\': {startingDay: true, '
      if (note.endDate) {
        startDateString += 'color:\'gray\'},'
        endDateString = '\'' + note.endDate + '\': {endingDay: true, color:\'gray\'},'
      } else {
        startDateString += 'color:\'gray\', endingDay: true},'
      }
    }
    let dateString = startDateString
    if (endDateString) {
      dateString = startDateString + endDateString
    }
    console.log('s', dateString)
    return dateString
  }

  render() {
    if (!this.props.notes) {
      return null
    }
    const notes = Object.values(this.props.notes)
    this.formulateDate(notes[1])
    //const markedDates = notes.map(n => this.formulateDate(n))
    //console.log('md', markedDates)

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
    notes: state.notes
  }
}

export default connect(
  mapStateToProps,
  { initNotes }
)(HomeScreen)