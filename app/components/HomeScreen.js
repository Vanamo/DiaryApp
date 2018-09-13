import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { hideLoader } from '../reducers/loaderReducer'
import Notification from './Notification'
import { CalendarList } from 'react-native-calendars'

class HomeScreen extends React.Component {

  componentDidMount() {
    this.props.hideLoader()
  }

  render() {
    const currentDate = new Date().toJSON().slice(0,10)
    console.log('date', currentDate)  

    return (
      <View style={styles.container}>
        <View style={{ height: 100 }}>
          <Notification />
        </View>
        <CalendarList
          horizontal={true}
          pagingEnabled={true}
          maxDate={currentDate}
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
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { hideLoader }
)(HomeScreen)