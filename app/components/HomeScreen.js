import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { hideLoader } from '../reducers/loaderReducer'
import Notification from './Notification'

class HomeScreen extends React.Component {

  state = {
    currentUser: null
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    this.props.hideLoader()
  }

  render() {
    const { currentUser } = this.state

    return (
      <View style={styles.container}>
        <Notification />
        <Text>
          Hei {currentUser && currentUser.email}!
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default connect(
  null,
  { hideLoader }
)(HomeScreen)