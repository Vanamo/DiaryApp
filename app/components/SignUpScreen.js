import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { register } from '../reducers/authReducer'
import Notification from './Notification'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Tile } from 'react-native-elements'
import CustomButton from '../utils/CustomButton'

class SignUpScreen extends React.Component {

  state = {
    username: '',
    email: '',
    password: '',
    cPassword: ''
  }

  handleSignUp = async () => {
    const data = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    }
    this.props.register(data, this.onSuccess)
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
            onPress={() => this.props.navigation.navigate('Login')}
            title1='Onko sinulla jo käyttäjätunnus?'
            title2='Kirjaudu sisään tästä'
            width='wide'
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
          <View style={{ marginTop: 15 }}/>
          <CustomButton
            title1='Luo käyttäjätunnus'
            onPress={this.handleSignUp}
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
    marginRight: 13
  }
})

export default connect(
  null,
  { register }
)(SignUpScreen)