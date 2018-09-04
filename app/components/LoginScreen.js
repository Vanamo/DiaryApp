import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { login } from '../reducers/authReducer'
import Notification from './Notification'
import { newErrorNotification } from '../reducers/notificationReducer'

class LoginScreen extends React.Component {

  state = {
    email: '',
    password: ''
  }

  handleLogin = () => {
    const data = { email: this.state.email, password: this.state.password }
    this.props.login(data, this.onSuccess, this.onError)
  }

  onSuccess = () => {
    this.props.navigation.navigate('Home')
  }

  onError = () => {
    this.props.newErrorNotification('Väärä sähköpostiosoite tai salasana', 5)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Kirjaudu sisään</Text>
        <Notification/>
        <TextInput
          style={styles.textInput}
          autoCapitalize='none'
          placeholder='Sähköpostiosoite'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize='none'
          placeholder='Salasana'
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button
          title='Kirjaudu sisään'
          onPress={this.handleLogin}
        />
        <Button
          title='Jos sinulla ei ole vielä käyttäjätunnusta, luo se tästä'
          onPress={() => this.props.navigation.navigate('SignUp')}
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
  { login, newErrorNotification }
)(LoginScreen)