import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
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
    const reservedDays = this.props.reservedDays
    console.log('rDays', reservedDays)
    let markedDates = null
    if (!reservedDays) {
      return null
    } else {
      markedDates = this.convertToDates(reservedDays)
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
    userNotes: state.userNotes,
    reservedDays: state.reservedDays
  }
}

export default connect(
  mapStateToProps
)(HomeScreen)