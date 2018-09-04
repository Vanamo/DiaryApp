import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { register } from '../reducers/authReducer'

class SignUpScreen extends React.Component {

  state = {
    email: '',
    password: '',
    errorMessage: null
  }

  handleSignUp = async () => {
    const data = { email: this.state.email, password: this.state.password }
    await this.props.register(data)
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Luo käyttäjätunnus</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
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
  { register }
)(SignUpScreen)