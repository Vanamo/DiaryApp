import React from 'react'
import firebase from 'firebase'
import * as c from './app/config/constants'
import { Provider } from 'react-redux'
import { View } from 'react-native'
import { Font } from 'expo'
import store from './app/store'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
import HomeScreen from './app/components/HomeScreen'
import NoteScreen from './app/components/NoteScreen'
import SearchScreen from './app/components/SearchScreen'
import SettingsScreen from './app/components/SettingsScreen'
import AppHeader from './app/components/AppHeader'
import LoginScreen from './app/components/LoginScreen'
import SignUpScreen from './app/components/SignUpScreen'
import AuthLoadingScreen from './app/components/AuthLoadingScreen'
import Loader from './app/utils/Loader'


const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Note: NoteScreen,
    Search: SearchScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }) => ({
      header: (
        <AppHeader navigation={navigation} />
      )
    })
  }
)

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
          <View
            style={{ flex: 1 }}
          >
            <Loader />
            <RootStack />
          </View>
        </Provider>
      )
    } else {
      return null
    }
  }
}