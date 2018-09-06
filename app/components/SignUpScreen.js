import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { register } from '../reducers/authReducer'
import { newErrorNotification } from '../reducers/notificationReducer'
import Notification from './Notification'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, Tile } from 'react-native-elements'

class SignUpScreen extends React.Component {

  state = {
    username: '',
    email: '',
    password: '',
    cPassword: ''
  }

  handleSignUp = () => {
    const data = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    }
    this.props.register(data, this.onSuccess, this.onError)
  }

  onSuccess = () => {
    this.props.navigation.navigate('Home')
  }

  onError = (error) => {
    this.props.newErrorNotification(error.message, 5)
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
          <Button
            title='Onko sinulla jo käyttäjätunnus? Kirjaudu sisään tästä'
            onPress={() => this.props.navigation.navigate('Login')}
            borderRadius={4}
          />
          <Text style={styles.title}>Luo käyttäjätunnus</Text>
          <Notification />
          <TextInput
            placeholder='Käyttäjätunnus'
            autoCapitalize='none'
            style={styles.textInput}
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
            underlineColorAndroid='transparent'
          />
          <TextInput
            placeholder='Sähköpostiosoite'
            autoCapitalize='none'
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            underlineColorAndroid='transparent'
          />
          <TextInput
            secureTextEntry
            placeholder='Salasana'
            autoCapitalize='none'
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            underlineColorAndroid='transparent'
          />
          <Button
            title='Luo käyttäjätunnus'
            onPress={this.handleSignUp}
            borderRadius={4}
            buttonStyle={{ marginTop: 15 }}
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
    marginTop: 20
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    marginLeft: 13
  }
})

export default connect(
  null,
  { register, newErrorNotification }
)(SignUpScreen)