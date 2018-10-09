import React from 'react'
import { ScrollView, StyleSheet, TextInput, View } from 'react-native'
import { connect } from 'react-redux'
import Notification from './Notification'
import { CalendarList } from 'react-native-calendars'
import { setInitialTab } from '../reducers/tabReducer'
import { Icon } from 'react-native-elements'

class HomeScreen extends React.Component {

  state = {
    currentUser: null,
    searchDate: null,
    currentDate: new Date().toISOString().slice(0, 10)
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

  onDayPress = async (day) => {
    const reservedDay = this.props.reservedDays.find(rd => rd.date === day.dateString)
    const userNotes = this.props.userNotes.sort(this.sortByStartDate)
    if (reservedDay) {
      const note = this.findNote(reservedDay)
      const index = userNotes.indexOf(note)
      console.log('i', index)
      console.log('nav', this.props.navigation)
      await this.props.setInitialTab(index)
      this.props.navigation.navigate('NoteView')
    } else {
      this.props.navigation.navigate('NewNote', { startDate: day })
    }
  }

  sortByStartDate = (a, b) => {
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

  render() {
    const reservedDays = this.props.reservedDays
    let markedDates = null
    if (!reservedDays) {
      return null
    } else {
      markedDates = this.convertToDates(reservedDays)
    }

    let searchDate = null
    if (this.state.searchDate) {
      searchDate = this.state.searchDate.split('.').reverse().join('-')
    } else {
      searchDate = new Date().toISOString().slice(0, 10)
    }
    console.log('sd', searchDate)
    console.log('cd', this.state.currentDate)
    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.messageContainer}>
          <View style={styles.inline}>
            <TextInput
              placeholder='pp.kk.vvvv'
              keyboardType='numeric'
              autoCapitalize='none'
              style={styles.textInput}
              onChangeText={searchDate => this.setState({ searchDate })}
              value={this.state.searchDate}
              underlineColorAndroid='transparent'
            />
            <Icon
              name='magnifying-glass'
              type='entypo'
              color='white'
              containerStyle={styles.iconContainer}
              onPress={() => this.setState({ currentDate: searchDate })}
            /> 
          </View>
          <Notification />
        </View>
        <View style={styles.container}>
          <CalendarList
            current={this.state.currentDate}
            horizontal={true}
            pagingEnabled={true}
            maxDate={new Date()}
            markedDates={markedDates}
            markingType={'period'}
            onDayPress={(day) => this.onDayPress(day)}
            pastScrollRange={1200}
            futureScrollRange={12}
            theme={{
              calendarBackground: 'transparent',
              textDayFontFamily: 'dancing-regular',
              textMonthFontFamily: 'dancing-bold',
              textDayHeaderFontFamily: 'dancing-regular',
              textDayFontSize: 13,
              textMonthFontSize: 21,
              textDayHeaderFontSize: 17
            }}
            style={{ height: 400 }}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  messageContainer: {
    height: 90,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    marginTop: 13
  },
  inline: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  textInput: {
    height: 40,
    width: 85,
    borderColor: '#9e9e9e',
    borderWidth: 1,
    marginTop: 8,
    marginLeft: 13,
    paddingLeft: 5,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4
  },
  iconContainer: {
    backgroundColor: '#9e9e9e',
    marginTop: 8,
    padding: 5,
    height: 40,
    width: 50,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4
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
  mapStateToProps,
  { setInitialTab }
)(HomeScreen)