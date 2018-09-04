import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { register } from '../reducers/authReducer'
import { newErrorNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

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
      <View style={styles.container}>
        <Text>Luo käyttäjätunnus</Text>
        <Notification />
        <TextInput
          placeholder='Käyttäjätunnus'
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
        <TextInput
          placeholder='Sähköpostiosoite'
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder='Salasana'
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TextInput
          secureTextEntry
          placeholder='Salasana uudestaan'
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={cPassword => this.setState({ cPassword })}
          value={this.state.cPassword}
        />
        <Button
          title='Luo käyttäjätunnus'
          onPress={this.handleSignUp}
        />
        <Button
          title='Onko sinulla jo käyttäjätunnus? Kirjaudu sisään tästä'
          onPress={() => this.props.navigation.navigate('Login')}
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
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})

export default connect(
  null,
  { register, newErrorNotification }
)(SignUpScreen)