import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { hideLoader } from '../reducers/loaderReducer'
import Notification from './Notification'

class HomeScreen extends React.Component {

  state = {
    currentUser: null
  }

  componentDidMount() {
    const currentUser = this.props.auth.user
    this.setState({ currentUser })
    this.props.hideLoader()
  }

  componentDidUpdate(prevProps) {
    const currentUser = this.props.auth.user
    if (currentUser !== prevProps.auth.user) {
      this.setState({ currentUser })
    }
  }

  render() {
    const currentUser = this.state.currentUser
    if (!currentUser) {
      return null
    }

    return (
      <View style={styles.container}>
        <Notification />
        <Text>
          Hei {currentUser && currentUser.username}!
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { hideLoader }
)(HomeScreen)