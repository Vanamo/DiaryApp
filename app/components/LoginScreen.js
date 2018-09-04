import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'

class LoginScreen extends React.Component {

  state = {
    email: '',
    password: '',
    errorMessage: null
  }

  handleLogin = () => {
    // TODO: Firebase stuff...
    console.log('handleLogin')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Kirjaudu sisään</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
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

export default LoginScreen