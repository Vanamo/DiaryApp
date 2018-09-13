import React from 'react'
import { connect } from 'react-redux'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'firebase'
import { setUser } from '../reducers/authReducer'

class AuthLoadingScreen extends React.Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user)
        this.props.navigation.navigate('Home')
      } else {
        this.props.navigation.navigate('SignUp')
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default connect(
  null,
  { setUser }
)(AuthLoadingScreen)