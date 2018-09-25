import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { initUserNotes } from '../reducers/noteReducer'
import Notification from './Notification'
import { CalendarList } from 'react-native-calendars'
import { setLoader, hideLoader } from '../reducers/loaderReducer'

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
      if (currentUser) {
        this.setState({ currentUser })
        console.log('user', currentUser)
        this.props.initUserNotes(currentUser.uid)
      }
    }
  }

  convertToDates = (userNotes) => {
    let string = '{'
    for (let i in userNotes) {
      string += this.formulateDate(userNotes[i])
    }
    string = string.slice(0, -2)
    string += '}'
    return JSON.parse(string)
  }

  formulateDate = (note) => {
    const startDate = note.startDate.split('.').reverse().join('-')
    const endDate = note.endDate.split('.').reverse().join('-')

    let dateString = ''
    if (startDate === endDate) {
      dateString += '\"' + startDate + '\": {\"startingDay\": true, \"color\":\"gray\", \"endingDay\": true}, '
    } else {
      const startDateString = '\"' + startDate + '\": {\"startingDay\": true, \"color\":\"gray\"}, '
      const endDateString = '\"' + endDate + '\": {\"endingDay\": true, \"color\":\"gray\"}, '

      const datesBetween = this.getDates(startDate, endDate)
      let datesBetweenString = ''
      for (let i in datesBetween) {
        datesBetweenString += '\"' + datesBetween[i] + '\": {\"marked\": true, \"color\":\"gray\"}, '
      }

      dateString += startDateString + datesBetweenString + endDateString
    }
    return dateString
  }

  getDates = (startDate, endDate) => {
    const dateArray = new Array()
    const firstDate = new Date(startDate)
    let currentDate = new Date()
    currentDate.setDate(firstDate.getDate() + 1)
    const stopDate = new Date(endDate)
    while (currentDate < stopDate) {
      dateArray.push(new Date(currentDate).toISOString().slice(0, 10))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return dateArray
  }

  render() {
    const userNotes = this.props.userNotes
    console.log('notes', userNotes)
    let markedDates = null
    if (!userNotes) {
      return null
    } else {
      markedDates = this.convertToDates(userNotes)
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
          markedDates={markedDates}
          markingType={'period'}
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
  { initUserNotes, setLoader, hideLoader }
)(HomeScreen)