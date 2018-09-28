import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import Notification from './Notification'
import { CalendarList } from 'react-native-calendars'
import CustomButton from '../utils/CustomButton'

class HomeScreen extends React.Component {

  state = {
    currentUser: null,
    calendarView: true
  }

  componentDidMount() {
    const currentUser = this.props.auth.user
    this.setState({ currentUser })
  }

  componentDidUpdate(prevProps) {
    const currentUser = this.props.auth.user
    if (currentUser !== prevProps.auth.user) {
      if (currentUser) {
        this.setState({ currentUser })
        console.log('user', currentUser)
      }
    }
  }

  convertToDates = (reservedDays) => {
    let string = '{'
    for (let i in reservedDays) {
      string += this.formulateDate(reservedDays[i])
    }
    if (string.length > 1) {
      string = string.slice(0, -2)
    }
    string += '}'
    return JSON.parse(string)
  }

  formulateDate = (day) => {
    const color = '#9e9e9e'
    const startDate = day.startDate
    const endDate = day.endDate

    let dateString = ''
    if (startDate && endDate) {
      dateString += '\"' + day.date + '\": {\"startingDay\": true, \"color\":\"' + color + '\", \"endingDay\": true}, '
    } else if (startDate) {
      dateString = '\"' + day.date + '\": {\"startingDay\": true, \"color\":\"' + color + '\"}, '
    } else if (endDate) {
      dateString = '\"' + day.date + '\": {\"endingDay\": true, \"color\":\"' + color + '\"}, '
    } else {
      dateString += '\"' + day.date + '\": {\"marked\": true, \"color\":\"' + color + '\"}, '
    }
    return dateString
  }

  onDayPress = (day) => {
    const reservedDay = this.props.reservedDays.find(rd => rd.date === day.dateString)
    if (reservedDay) {
      const note = this.findNote(reservedDay)
      const index = this.props.userNotes.indexOf(note)
      console.log('i', index)
      console.log('nav', this.props.navigation)
      this.props.navigation.navigate('NoteView')
    }
  }

  findNote = (reservedDay) => {
    let note = null
    if (reservedDay.startDate) {
      note = this.props.userNotes.find(un =>
        un.startDate.split('.').reverse().join('-') === reservedDay.date)
    } else if (reservedDay.endDate) {
      note = this.props.userNotes.find(un =>
        un.endDate.split('.').reverse().join('-') === reservedDay.date)
    } else {
      let currentDate = new Date(reservedDay.date)
      while (!note) {
        currentDate.setDate(currentDate.getDate() + 1)
        if (currentDate > new Date()) return
        note = this.props.userNotes.find(un => {
          const endDate = un.endDate.split('.').reverse().join('-')
          const date = currentDate.toISOString().slice(0, 10)
          return endDate === date
        })
      }
    }
    return note
  }

  toggleView = () => {
    this.setState({ calendarView: !this.state.calendarView })
  }

  render() {
    const reservedDays = this.props.reservedDays
    console.log('rDays', reservedDays)
    let markedDates = null
    if (!reservedDays) {
      return null
    } else {
      markedDates = this.convertToDates(reservedDays)
    }

    const buttonTitle = this.state.calendarView ? 'Selailunäkymä' : 'Kalenterinäkymä'

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.buttonContainer}>
          <Notification />
          <CustomButton
            onPress={this.toggleView}
            title1={buttonTitle}
          />
        </View>
        <View style={styles.container}>
          <CalendarList
            horizontal={true}
            pagingEnabled={true}
            maxDate={new Date()}
            markedDates={markedDates}
            markingType={'period'}
            onDayPress={(day) => this.onDayPress(day)}
          />
        </View>
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
  },
  buttonContainer: {
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white'
  }
})

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    userNotes: state.userNotes,
    reservedDays: state.reservedDays
  }
}

export default connect(
  mapStateToProps
)(HomeScreen)