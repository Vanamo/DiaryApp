import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'

class Notification extends React.Component {
  render() {
    const notification = this.props.notification

    if (notification.message) {
      if (notification.style === 'success') {
        return (
          <View>
            <Text>
              {notification.message}
            </Text>
          </View>
        )
      } else if (notification.style === 'error') {
        return (
          <View style={styles.container}>
            <Text style={styles.errorMessage}>
              {notification.message}
            </Text>
          </View>
        )
      }
    } else {
      return (
        null
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 13,
    marginTop: 8
  },
  errorMessage: {
    color: 'red',
    fontFamily: 'caveat-regular',
    fontSize: 17
  }
})

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)