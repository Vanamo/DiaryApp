import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { logout } from '../reducers/authReducer'
import { newErrorNotification } from '../reducers/notificationReducer' 
import Notification from './Notification'

class HomeScreen extends React.Component {

  state = {
    currentUser: null
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  handleLogout = () => {
    this.props.logout(this.onSuccess, this.onError)
  }

  onSuccess = () => {
    this.props.navigation.navigate('AuthLoading')
  }

  onError = () => {
    this.props.newErrorNotification('Uloskirjautuminen ei onnistunut', 5)
  }

  render() {
    const { currentUser } = this.state

    return (
      <View style={styles.container}>
        <Notification/>
        <Text>
          Hei {currentUser && currentUser.email}!
        </Text>
        <Button
          onPress={this.handleLogout}
          title='Kirjaudu ulos'
        />
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
  { logout, newErrorNotification }
)(HomeScreen)