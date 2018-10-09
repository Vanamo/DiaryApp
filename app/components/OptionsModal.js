import React from 'react'
import { connect } from 'react-redux'
import { hideOptions } from '../reducers/optionsModalReducer'
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { logout } from '../reducers/authReducer'

class OptionsModal extends React.Component {

  state = {
    currentUser: null
  }

  componentDidMount() {
    const currentUser = this.props.auth.user
    this.setState({ currentUser })
  }

  componentDidUpdate(prevProps) {
    const currentUser = this.props.auth.user
    if (currentUser !== prevProps.auth.user) {
      this.setState({ currentUser })
    }
  }

  handleLogout = () => {
    this.props.logout(this.onSuccess)
  }

  onSuccess = () => {
    this.props.navigation.navigate('AuthLoading')
  }

  hideModal = () => {
    this.props.hideOptions()
  }

  render() {
    const currentUser = this.state.currentUser
    if (!currentUser) {
      return null
    }

    return (
      <Modal
        visible={this.props.optionsVisible}
        transparent={true}
        animationType={'none'}
        onRequestClose={() => {
          console.log('close options')
        }}
      >
        <TouchableWithoutFeedback
          onPress={this.hideModal}
        >
          <View style={styles.optionsBackground}>
            <View style={styles.optionsWrapper}>
              <View style={styles.optionAbove}>
                <Text style={styles.userText}>{currentUser && currentUser.username} </Text>
              </View>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.hideModal()
                  this.props.navigation.navigate('Settings')
                }}
              >
                <View style={styles.optionAbove}>
                  <Text style={styles.optionText}>Asetukset</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.hideModal()
                  this.handleLogout()
                }}
              >
                <View style={styles.optionBelow}>
                  <Text style={styles.optionText}>Kirjaudu ulos</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  optionsBackground: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    marginTop: 70,
    marginRight: 2
  },
  optionsWrapper: {
    backgroundColor: '#FFFFFF',
    height: 120,
    width: 120,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    borderWidth: 0.5,
    borderColor: 'grey'
  },
  optionAbove: {
    height: 40,
    width: 120,
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  optionBelow: {
    height: 40,
    width: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  optionText: {
    paddingLeft: 5,
    fontSize: 18,
    fontFamily: 'dancing-regular'
  },
  userText: {
    paddingLeft: 5,
    fontSize: 20,
    fontFamily: 'dancing-bold'
  }
})

const mapStateToProps = (state) => {
  return {
    optionsVisible: state.optionsVisible,
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { hideOptions, logout }
)(OptionsModal)