import React from 'react'
import { LocaleConfig } from 'react-native-calendars'
import { Provider } from 'react-redux'
import { View } from 'react-native'
import { Font } from 'expo'
import store from './app/store'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
import { Permissions } from 'expo'
import HomeScreen from './app/components/HomeScreen'
import NewNoteScreen from './app/components/NewNoteScreen'
import EditNoteScreen from './app/components/EditNoteScreen'
import NoteViewTabs from './app/components/NoteViewTabs'
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
    NewNote: NewNoteScreen,
    EditNote: EditNoteScreen,
    NoteView: NoteViewTabs,
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

//Configure calendar

LocaleConfig.locales['fi'] = {
  monthNames: ['Tammikuu', 'Helmikuu', 'Malliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu',
    'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'],
  monthNamesShort: ['Tammi', 'Helmi', 'Maalis', 'Huhti', 'Touko', 'Kesä', 'Heinä', 'Elo',
    'Syys', 'Loka', 'Marras', 'Joulu'],
  dayNames: ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai',
    'Perjantai', 'Lauantai'],
  dayNamesShort: ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La']
}

LocaleConfig.defaultLocale = 'fi'

export default class App extends React.Component {

  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      'caveat-regular': require('./assets/fonts/Caveat-Regular.ttf'),
      'caveat-bold': require('./assets/fonts/Caveat-Bold.ttf')
    })
    this.setState({ fontLoaded: true })
    this.askCameraPermissions()
  }

  askCameraPermissions = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      await Permissions.askAsync(Permissions.CAMERA_ROLL)
    }
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