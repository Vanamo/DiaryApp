import React from 'react'
import firebase from 'firebase'
import * as c from './app/config/constants'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { Font } from 'expo'
import store from './app/store'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
import HomeScreen from './app/components/HomeScreen'
import LoginScreen from './app/components/LoginScreen'
import SignUpScreen from './app/components/SignUpScreen'
import AuthLoadingScreen from './app/components/AuthLoadingScreen'

const AppStack = createStackNavigator({
  Home: HomeScreen
})

const AuthStack = createStackNavigator({
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      header: null
    })
  }
})

const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

// Initialize Firebase
const config = {
  apiKey: c.FIREBASE_API_KEY,
  authDomain: c.FIREBASE_AUTH_DOMAIN,
  databaseURL: c.FIREBASE_DATABASE_URL,
  projectId: c.FIREBASE_PROJECT_ID,
  storageBucket: c.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: c.FIREBASE_MESSAGING_SENDER_ID
}

firebase.initializeApp(config)

export default class App extends React.Component {

  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      'caveat-regular': require('./assets/fonts/Caveat-Regular.ttf')
    })
    this.setState({ fontLoaded: true })
  }

  render() {
    console.ignoredYellowBox = ['Setting a timer']
    if (this.state.fontLoaded) {
      return (
        <Provider store={store}>
          <RootStack />
        </Provider>
      )
    } else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
