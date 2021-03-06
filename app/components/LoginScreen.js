import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { connect } from 'react-redux'
import { login } from '../reducers/authReducer'
import Notification from './Notification'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Tile } from 'react-native-elements'
import CustomButton from '../utils/CustomButton'

class LoginScreen extends React.Component {

  state = {
    email: '',
    password: ''
  }

  handleLogin = () => {
    const data = { email: this.state.email, password: this.state.password }
    this.props.login(data, this.onSuccess)
  }

  onSuccess = () => {
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps='always'
        enableOnAndroid={true}
      >
        <View style={styles.formContainer}>
          <Tile
            imageSrc={require('../../images/writing-1209121_1920.jpg')}
            containerStyle={{ height: 200 }}
          />
          <CustomButton
            onPress={() => this.props.navigation.navigate('SignUp')}
            title1='Jos sinulla ei vielä ole käyttäjätunnusta,'
            title2='luo se tästä '
            width='wide'
          />
          <Text style={styles.title}>Kirjaudu sisään</Text>
          <Notification />
          <TextInput
            style={styles.textInput}
            autoCapitalize='none'
            keyboardType='email-address'
            placeholder='Sähköpostiosoite'
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            underlineColorAndroid='transparent'
          />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize='none'
            placeholder='Salasana'
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            underlineColorAndroid='transparent'
          />
          <View style={{ marginTop: 15 }} />
          <CustomButton
            title1='Kirjaudu sisään'
            onPress={this.handleLogin}
          />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
    marginLeft: 13,
    marginTop: 50,
    fontSize: 20,
    fontFamily: 'dancing-regular'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    marginLeft: 13,
    marginRight: 13,
    paddingLeft: 5
  }
})

export default connect(
  null,
  { login }
)(LoginScreen)